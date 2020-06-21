export function walk (el, callback) {
  if (callback(el) === false) return

  let node = el.firstElementChild

  while (node) {
    this.walk(node, callback)

    node = node.nextElementSibling
  }
}
