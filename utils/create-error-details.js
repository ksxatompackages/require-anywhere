
module.exports = (error) => {
  'use strict'
  if (error) {
    let stack = error.stack
    if (stack) {
      return {'detail': stack}
    }
  }
  return {}
}
