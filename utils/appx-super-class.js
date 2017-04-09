
((module) => {
  'use strict'

  var createClass = require('../x-iterable.js')

  module.exports = (build, iterate) => {
    var Base = createClass.fromGenerator(iterate)

    class AppxSuper extends Base {
      constructor (...args) {
        super()
        return build(this, ...args)
      }
		}

    return createClass(AppxSuper)
  }
})(module)
