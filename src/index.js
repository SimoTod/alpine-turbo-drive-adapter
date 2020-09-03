import Bridge from './bridge'

const initAlpine = window.deferLoadingAlpine || ((callback) => callback())
window.deferLoadingAlpine = (callback) => {
  document.addEventListener('DOMContentLoaded', () => {
    const bridge = new Bridge()
    bridge.init()
    initAlpine(callback)
  })
}
