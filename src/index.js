import Bridge from './bridge'

if (window.Alpine) {
  console.error('Alpine-turbolinks-adapter must be included before AlpineJs')
}

const initAlpine = window.deferLoadingAlpine || ((callback) => callback())
window.deferLoadingAlpine = (callback) => {
  document.addEventListener('DOMContentLoaded', () => {
    const bridge = new Bridge()
    bridge.init()
    initAlpine(callback)
  })
}
