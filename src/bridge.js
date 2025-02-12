import { isValidVersion, dispatch } from './utils'

export default class Bridge {
  init () {
    if (!window.Alpine.version || !isValidVersion('3.0.0', window.Alpine.version)) {
      throw new Error('Invalid Alpine version. Please use Alpine 3.0.0 or above')
    }
    // Tag all cloaked elements on first page load.
    window.Alpine.mutateDom(() => {
      document.body.querySelectorAll('[x-cloak]').forEach((el) => {
        el.setAttribute('data-alpine-was-cloaked', el.getAttribute('x-cloak') ?? '')
      })
    })

    this.configureEventHandlers()
  }

  configureEventHandlers () {
    const renderCallback = (event) => {
      if (document.documentElement.hasAttribute('data-turbo-preview')) {
        return
      }

      dispatch(document, 'alpine:init')
      dispatch(document, 'alpine:initializing')
      window.Alpine.flushAndStopDeferringMutations()
      dispatch(document, 'alpine:initialised')
      window.Alpine.mutateDom(() => {
        document.querySelectorAll('[data-alpine-ignored]').forEach((el) => {
          el.removeAttribute('x-ignore')
          el.removeAttribute('data-alpine-ignored')
        })
      })
    }

    const beforeRenderCallback = (event) => {
      processAlpineElements(event.detail.newBody)
    }

    const beforeMorphCallback = (event) => {
      processAlpineElements(event.detail.newElement)
    }

    const processAlpineElements = (element) => {
      window.Alpine.mutateDom(() => {
        if (document.documentElement.hasAttribute('data-turbo-preview')) {
          return
        }
        element.querySelectorAll('[data-alpine-generated-me],[x-cloak]').forEach((el) => {
          if (el.hasAttribute('x-cloak')) {
            el.setAttribute('data-alpine-was-cloaked', el.getAttribute('x-cloak') ?? '')
          }
          if (el.hasAttribute('data-alpine-generated-me')) {
            el.removeAttribute('data-alpine-generated-me')
            el.remove()
          }
        })
      })
      window.Alpine.deferMutations()
    }

    const beforeCacheCallback = (event) => {
      window.Alpine.mutateDom(() => {
        document.body.querySelectorAll('[x-for],[x-if],[x-teleport],[data-alpine-was-cloaked]').forEach((el) => {
          if (el.hasAttribute('data-alpine-was-cloaked')) {
            el.setAttribute('x-cloak', el.getAttribute('data-alpine-was-cloaked') ?? '')
            el.removeAttribute('data-alpine-was-cloaked')
          }

          if (el.hasAttribute('x-for') && el._x_lookup) {
            Object.values(el._x_lookup).forEach(el => el.setAttribute('data-alpine-generated-me', true))
          }

          if (el.hasAttribute('x-if') && el._x_currentIfEl) {
            el._x_currentIfEl.setAttribute('data-alpine-generated-me', true)
          }

          if (el.hasAttribute('x-teleport') && el._x_teleport) {
            el._x_teleport.setAttribute('data-alpine-generated-me', true)
          }
        })
      })

      document.querySelectorAll('[data-turbo-permanent]').forEach((el) => {
        window.Alpine.mutateDom(() => {
          if (!el.hasAttribute('x-ignore')) {
            el.setAttribute('x-ignore', true)
            el.setAttribute('data-alpine-ignored', true)
          }
          el.querySelectorAll('[data-alpine-generated-me]').forEach((sub) => {
            sub.removeAttribute('data-alpine-generated-me')
          })
        })
      })
    }

    document.addEventListener('turbo:render', renderCallback)
    document.addEventListener('turbo:morph', renderCallback)
    document.addEventListener('turbo:before-render', beforeRenderCallback)
    document.addEventListener('turbo:before-morph-element', beforeMorphCallback)
    document.addEventListener('turbo:before-cache', beforeCacheCallback)
  }
}
