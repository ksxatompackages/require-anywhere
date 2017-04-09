
((module) => {
  'use strict'

  var recursiveConstructor = require('./utils/recursive-constructor.js')
  var manySameElements = require('./utils/many-same-elements.js')
  var ProductIterableSuper = require('./utils/appx-super-class.js')(build, iterate)

  class ProductIterable extends ProductIterableSuper {
    static times (...args) {
      return ProductIterable.pow(...args)
    }

    static pow (iterable, exponent) {
      var args = manySameElements(iterable, exponent)
      return args.length ? new ProductIterable(...args) : []
    }
	}

  module.exports = ProductIterable

  ProductIterable.Result = class extends Array {}

  function build (self, ...args) {
    return recursiveConstructor(self, ProductIterable, (value) => [value], ...args)
  }

  function * iterate () {
    for (let i of this.first) {
      for (let j of this.second) {
        yield new ProductIterable.Result(i, ...j)
      }
    }
  }
})(module)
