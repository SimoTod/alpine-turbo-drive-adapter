export function isValidVersion (required, current) {
  const requiredArray = required.split('.')
  const currentArray = current.split('.')
  for (let i = 0; i < requiredArray.length; i++) {
    if (currentArray[i] && currentArray[i] > requiredArray[i]) {
      return true
    }
  }
  return currentArray[requiredArray.length - 1] === requiredArray[requiredArray.length - 1]
}

export function dispatch (el, name, detail = {}) {
  el.dispatchEvent(
    new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true
    })
  )
}
