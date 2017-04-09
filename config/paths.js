
module.exports = script => {
  'use strict'

  return script ? main() : []

  function main () {
    var vm = require('vm')
    var functionizeClass = require('simple-function-utils/functionize-class')
    var ProductIterable = require('x-iterable/product-iterable')

    var env = process.env
    var product = functionizeClass(ProductIterable)

    var context = {
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
      var createErrorDetail = require('../utils/create-error-details.js')
      global.atom.notifications.addError(`ERROR: ${error}`, createErrorDetail(error))
    }
  }
}
