import Bridge from './bridge'
import { beforeDomReady } from './utils'

if (window.Alpine) {
  console.error('Alpine-turbolinks-adapter must be included before AlpineJs')
}

// To better suport x-cloak, we need to init the library when the DOM
// has been downloaded but before Alpine kicks in
beforeDomReady(() => {
  const bridge = new Bridge()
  bridge.init()
})
