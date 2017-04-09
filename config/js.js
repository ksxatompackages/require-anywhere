module.exports = js => {
  'use strict'

  return js ? main() : []

  function main () {
    try {
      return require(js)
    } catch (error) {
      const createErrorDetail = require('../utils/create-error-details.js')
      global.atom.notifications.addError(`ERROR: ${error}`, createErrorDetail(error))
    }
  }
}
