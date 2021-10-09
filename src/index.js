import Bridge from './bridge'

if (window.Alpine) {
  console.error('Alpine-turbo-drive-adapter must be included before AlpineJs')
}

// Polyfill for legacy browsers
if (!Object.getOwnPropertyDescriptor(NodeList.prototype, 'forEach')) {
  Object.defineProperty(NodeList.prototype, 'forEach', Object.getOwnPropertyDescriptor(Array.prototype, 'forEach'))
}

document.addEventListener('alpine:init', () => {
  const bridge = new Bridge()
  bridge.init()
}, { once: true })
