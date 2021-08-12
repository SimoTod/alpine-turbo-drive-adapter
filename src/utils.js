export function isValidVersion (required, current) {
  const requiredArray = required.split('.')
  const currentArray = current.split('.')
  for (let i = 0; i < requiredArray.length; i++) {
    if (!currentArray[i] || currentArray[i] < requiredArray[i]) {
      return false
    }
    else 
    if (currentArray[i] && currentArray[i] > requiredArray[i]) {
      return true
  }
  return true
}

export function beforeDomReady (callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'interactive') {
        callback()
      }
    })
  } else {
    callback()
  }
}
