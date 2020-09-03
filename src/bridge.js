import { isValidVersion } from './utils'

const XCLOAK = 'x-cloak'
const WAS_CLOAKED = 'data-alpine-was-cloaked'
const ALPINE_GENERATED = 'data-alpine-generated-me'

const LOAD_SELECTOR = '[x-cloak]'
const BEFORE_RENDER_SELECTOR = '[data-alpine-generated-me],[x-cloak]'
const BEFORE_CACHE_SELECTOR = '[x-for],[x-if],[data-alpine-was-cloaked]'

export default class Bridge {
  init () {
    const initAlpine = window.deferLoadingAlpine || ((callback) => callback())
    window.deferLoadingAlpine = (callback) => {
      this.setAlpine(window.Alpine) // eslint-disable-line no-undef

      document.addEventListener('turbolinks:load', () => {
        // Tag all cloaked elements on first page load.
        document.body.querySelectorAll(LOAD_SELECTOR).forEach((node) => {
          this.tagCloakedElement(node)
        })
        this.configureEventHandlers()

        // Alpine needs to wait until after page load because it immediatly
        // initializes components, which will remove the x-cloak attribute.
        initAlpine(callback)
      }, { once: true })
    }
  }

  setAlpine (reference) {
    if (!reference.version || !isValidVersion('2.4.0', reference.version)) {
      throw new Error('Invalid Alpine version. Please use Alpine 2.4.0 or above')
    }
    this.alpine = reference
  }

  tagCloakedElement (node) {
    node.setAttribute(WAS_CLOAKED, '')
  }

  configureEventHandlers () {
    // Once Turbolinks finished is magic, we initialise Alpine on the new page
    // and resume the observer
    document.addEventListener('turbolinks:load', () => {
      this.alpine.discoverUninitializedComponents((el) => {
        this.alpine.initializeComponent(el)
      })

      requestAnimationFrame(() => { this.alpine.pauseMutationObserver = false })
    })

    // Before swapping the body, clean up any element with x-turbolinks-cached
    // which do not have any Alpine properties.
    // Note, at this point all html fragments marked as data-turbolinks-permanent
    // are already copied over from the previous page so they retain their listener
    // and custom properties and we don't want to reset them.
    document.addEventListener('turbolinks:before-render', (event) => {
      event.data.newBody.querySelectorAll(BEFORE_RENDER_SELECTOR).forEach((el) => {
        if (el.hasAttribute(XCLOAK)) {
          // When we get a new document body tag any cloaked elements so we can cloak
          // them again before caching.
          this.tagCloakedElement(el)
        }

        if (el.hasAttribute(ALPINE_GENERATED)) {
          el.removeAttribute(ALPINE_GENERATED)
          if (typeof el.__x_for_key === 'undefined' && typeof el.__x_inserted_me === 'undefined') {
            el.remove()
          }
        }
      })
    })

    // Pause the the mutation observer to avoid data races, it will be resumed by the turbolinks:load event.
    // We mark as `data-alpine-generated-m` all elements that are crated by an Alpine templating directives.
    // The reason is that turbolinks caches pages using cloneNode which removes listeners and custom properties
    // So we need to propagate this infomation using a HTML attribute. I know, not ideal but I could not think
    // of a better option.
    // Note, we can't remove any Alpine generated element as yet because if they live inside an element
    // marked as data-turbolinks-permanent they need to be copied into the next page.
    // The coping process happens somewhere between before-cache and before-render.
    document.addEventListener('turbolinks:before-cache', () => {
      this.alpine.pauseMutationObserver = true

      document.body.querySelectorAll(BEFORE_CACHE_SELECTOR).forEach((el) => {
        // Cloak any elements again that were tagged when the page was loaded
        if (el.hasAttribute(WAS_CLOAKED)) {
          el.setAttribute(XCLOAK, '')
          el.removeAttribute(WAS_CLOAKED)
        }

        if (el.hasAttribute('x-for')) {
          let nextEl = el.nextElementSibling
          while (nextEl && typeof nextEl.__x_for_key !== 'undefined') {
            const currEl = nextEl
            nextEl = nextEl.nextElementSibling
            currEl.setAttribute(ALPINE_GENERATED, true)
          }
        } else if (el.hasAttribute('x-if')) {
          const ifEl = el.nextElementSibling
          if (ifEl && typeof ifEl.__x_inserted_me !== 'undefined') {
            ifEl.setAttribute(ALPINE_GENERATED, true)
          }
        }
      })
    })
  }
}
