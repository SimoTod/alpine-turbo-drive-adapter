export function isValidVersion (required, current) {
  const requiredArray = required.split('.').map(Number)
  const currentArray = current.split('.').map(Number)
  
  for (let i = 0; i < requiredArray.length; i++) {
    if (currentArray[i] > requiredArray[i]) return true
    if (currentArray[i] < requiredArray[i]) return false
  }
  return true
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
