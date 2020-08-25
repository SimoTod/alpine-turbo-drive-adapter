function isValidVersion(required, current) {
  const requiredArray = required.split('.');
  const currentArray = current.split('.');

  for (let i = 0; i < requiredArray.length; i++) {
    if (!currentArray[i] || currentArray[i] < requiredArray[i]) {
      return false;
    }
  }

  return true;
}

class Bridge {
  constructor() {
    this.setAlpine(window.Alpine); // eslint-disable-line no-undef
  }

  setAlpine(reference) {
    if (!reference.version || !isValidVersion('2.4.0', reference.version)) {
      throw new Error('Invalid Alpine version. Please use Alpine 2.4.0 or above');
    }

    this.alpine = reference;
  }

  init() {
    // Once Turbolinks finished is magic, we initialise Alpine on the new page
    // and resume the observer
    document.addEventListener('turbolinks:load', () => {
      this.alpine.discoverUninitializedComponents(el => {
        this.alpine.initializeComponent(el);
      });
      this.alpine.pauseMutationObserver = true;
    }); // Before swapping the body, clean up any element with x-turbolinks-cached
    // which do not have any Alpine properties.
    // Note, at this point all html fragments marked as data-turbolinks-permanent
    // are already copied over from the previous page so they retain their listener
    // and custom properties and we don't want to reset them.

    document.addEventListener('turbolinks:before-render', event => {
      event.data.newBody.querySelectorAll('[data-alpine-generated-me]').forEach(el => {
        el.removeAttribute('data-alpine-generated-me');

        if (typeof el.__x_for_key === 'undefined' && typeof el.__x_inserted_me === 'undefined') {
          el.remove();
        }
      });
    }); // Pause the the mutation observer to avoid data races, it will be resumed by the turbolinks:load event.
    // We mark as `data-alpine-generated-m` all elements that are crated by an Alpine templating directives.
    // The reason is that turbolinks caches pages using cloneNode which removes listeners and custom properties
    // So we need to propagate this infomation using a HTML attribute. I know, not ideal but I could not think
    // of a better option.
    // Note, we can't remove any Alpine generated element as yet because if they live inside an element
    // marked as data-turbolinks-permanent they need to be copied into the next page.
    // The coping process happens somewhere between before-cache and before-render.

    document.addEventListener('turbolinks:before-cache', () => {
      this.alpine.pauseMutationObserver = true;
      document.body.querySelectorAll('[x-for],[x-if]').forEach(el => {
        if (el.hasAttribute('x-for')) {
          let nextEl = el.nextElementSibling;

          while (nextEl && nextEl.__x_for_key !== 'undefined') {
            const currEl = nextEl;
            nextEl = nextEl.nextElementSibling;
            currEl.setAttribute('data-alpine-generated-me', true);
          }
        } else if (el.hasAttribute('x-if')) {
          const ifEl = el.nextElementSibling;

          if (ifEl && typeof ifEl.__x_inserted_me !== 'undefined') {
            ifEl.setAttribute('data-alpine-generated-me', true);
          }
        }
      });
    });
  }

}

const bridge = new Bridge();
bridge.init();
