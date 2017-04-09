module.exports = json => {
  'use strict'

  return json ? main() : []

  function main () {
    const readFileSync = require('fs').readFileSync

    try {
      return JSON.parse(readFileSync(json, {encoding: 'utf8'}))
    } catch (error) {
      const createErrorDetail = require('../utils/create-error-details.js')
      global.atom.notifications.addError(`ERROR: ${error}`, createErrorDetail(error))
    }
  }
}
