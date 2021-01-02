import Bridge from './bridge'
import { beforeDomReady } from './utils'

if (window.Alpine) {
  console.error('Alpine-turbo-drive-adapter must be included before AlpineJs')
}

// Polyfill for legacy browsers
if (!Object.getOwnPropertyDescriptor(NodeList.prototype, 'forEach')) {
  Object.defineProperty(NodeList.prototype, 'forEach', Object.getOwnPropertyDescriptor(Array.prototype, 'forEach'))
}

// To better suport x-cloak, we need to init the library when the DOM
// has been downloaded but before Alpine kicks in
beforeDomReady(() => {
  const bridge = new Bridge()
  bridge.init()
})
