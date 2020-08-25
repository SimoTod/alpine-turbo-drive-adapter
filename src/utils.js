export function isValidVersion (required, current) {
  const requiredArray = required.split('.')
  const currentArray = current.split('.')
  for (let i = 0; i < requiredArray.length; i++) {
    if (!currentArray[i] || currentArray[i] < requiredArray[i]) {
      return false
    }
  }
  return true
}
