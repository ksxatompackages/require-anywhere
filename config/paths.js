module.exports = script => {
  'use strict'

  return script ? main() : []

  function main () {
    const vm = require('vm')
    const functionizeClass = require('simple-function-utils/functionize-class')
    const ProductIterable = require('x-iterable/product-iterable')

    const env = process.env
    const product = functionizeClass(ProductIterable)

    const context = {
      'path': require('path'),
      'xiter': require('x-iterable'),
      'sfu': require('simple-function-utils'),
      '__proto__': {
        'env': env,
        'require': require,
        'product': product,
        'times': product,
        '__proto__': env
      }
    }

    try {
      return vm.runInNewContext(script, context)
    } catch (error) {
      const createErrorDetail = require('../utils/create-error-details.js')
      global.atom.notifications.addError(`ERROR: ${error}`, createErrorDetail(error))
    }
  }
}
