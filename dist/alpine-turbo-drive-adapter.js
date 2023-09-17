(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function isValidVersion(required, current) {
    var requiredArray = required.split('.');
    var currentArray = current.split('.');

    for (var i = 0; i < requiredArray.length; i++) {
      if (currentArray[i] && currentArray[i] > requiredArray[i]) {
        return true;
      }
    }

    return currentArray[requiredArray.length - 1] === requiredArray[requiredArray.length - 1];
  }
  function dispatch(el, name) {
    var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    el.dispatchEvent(new CustomEvent(name, {
      detail: detail,
      bubbles: true,
      composed: true,
      cancelable: true
    }));
  }

  var Bridge = /*#__PURE__*/function () {
    function Bridge() {
      _classCallCheck(this, Bridge);
    }

    _createClass(Bridge, [{
      key: "init",
      value: function init() {
        if (!window.Alpine.version || !isValidVersion('3.0.0', window.Alpine.version)) {
          throw new Error('Invalid Alpine version. Please use Alpine 3.0.0 or above');
        } // Tag all cloaked elements on first page load.


        window.Alpine.mutateDom(function () {
          document.body.querySelectorAll('[x-cloak]').forEach(function (el) {
            var _el$getAttribute;

            el.setAttribute('data-alpine-was-cloaked', (_el$getAttribute = el.getAttribute('x-cloak')) !== null && _el$getAttribute !== void 0 ? _el$getAttribute : '');
          });
        });
        this.configureEventHandlers();
      }
    }, {
      key: "configureEventHandlers",
      value: function configureEventHandlers() {
        var renderCallback = function renderCallback(event) {
          if (document.documentElement.hasAttribute('data-turbo-preview')) {
            return;
          }

          dispatch(document, 'alpine:init');
          dispatch(document, 'alpine:initializing');
          window.Alpine.flushAndStopDeferringMutations();
          dispatch(document, 'alpine:initialised');
          window.Alpine.mutateDom(function () {
            document.querySelectorAll('[data-alpine-ignored]').forEach(function (el) {
              el.removeAttribute('x-ignore');
              el.removeAttribute('data-alpine-ignored');
            });
          });
        };

        var beforeRenderCallback = function beforeRenderCallback(event) {
          window.Alpine.mutateDom(function () {
            if (document.documentElement.hasAttribute('data-turbo-preview')) {
              return;
            }

            event.detail.newBody.querySelectorAll('[data-alpine-generated-me],[x-cloak]').forEach(function (el) {
              if (el.hasAttribute('x-cloak')) {
                var _el$getAttribute2;

                el.setAttribute('data-alpine-was-cloaked', (_el$getAttribute2 = el.getAttribute('x-cloak')) !== null && _el$getAttribute2 !== void 0 ? _el$getAttribute2 : '');
              }

              if (el.hasAttribute('data-alpine-generated-me')) {
                el.removeAttribute('data-alpine-generated-me');
                el.remove();
              }
            });
          });
          window.Alpine.deferMutations();
        };

        var beforeCacheCallback = function beforeCacheCallback(event) {
          window.Alpine.mutateDom(function () {
            document.body.querySelectorAll('[x-for],[x-if],[x-teleport],[data-alpine-was-cloaked]').forEach(function (el) {
              if (el.hasAttribute('data-alpine-was-cloaked')) {
                var _el$getAttribute3;

                el.setAttribute('x-cloak', (_el$getAttribute3 = el.getAttribute('data-alpine-was-cloaked')) !== null && _el$getAttribute3 !== void 0 ? _el$getAttribute3 : '');
                el.removeAttribute('data-alpine-was-cloaked');
              }

              if (el.hasAttribute('x-for') && el._x_lookup) {
                Object.values(el._x_lookup).forEach(function (el) {
                  return el.setAttribute('data-alpine-generated-me', true);
                });
              }

              if (el.hasAttribute('x-if') && el._x_currentIfEl) {
                el._x_currentIfEl.setAttribute('data-alpine-generated-me', true);
              }

              if (el.hasAttribute('x-teleport') && el._x_teleport) {
                el._x_teleport.setAttribute('data-alpine-generated-me', true);
              }
            });
          });
          document.querySelectorAll('[data-turbo-permanent]').forEach(function (el) {
            window.Alpine.mutateDom(function () {
              if (!el.hasAttribute('x-ignore')) {
                el.setAttribute('x-ignore', true);
                el.setAttribute('data-alpine-ignored', true);
              }

              el.querySelectorAll('[data-alpine-generated-me]').forEach(function (sub) {
                sub.removeAttribute('data-alpine-generated-me');
              });
            });
          });
        };

        document.addEventListener('turbo:render', renderCallback);
        document.addEventListener('turbo:before-render', beforeRenderCallback);
        document.addEventListener('turbo:before-cache', beforeCacheCallback);
      }
    }]);

    return Bridge;
  }();

  if (window.Alpine) {
    console.error('Alpine-turbo-drive-adapter must be included before AlpineJs');
  } // Polyfill for legacy browsers


  if (!Object.getOwnPropertyDescriptor(NodeList.prototype, 'forEach')) {
    Object.defineProperty(NodeList.prototype, 'forEach', Object.getOwnPropertyDescriptor(Array.prototype, 'forEach'));
  }

  document.addEventListener('alpine:init', function () {
    var bridge = new Bridge();
    bridge.init();
  }, {
    once: true
  });

}));
