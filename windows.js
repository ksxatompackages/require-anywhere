
((module) => {
  'use strict'

  var join = require('path').join
  var ProductIterable = require('./product-iterable.js')

  var env = process.env
  var keys = [...Object.keys(env), ...Object.getOwnPropertyNames(env)]

  var getEnv = (vname) =>
    env[keys.find((name) => name.toUpperCase() === vname)] || ''

  var allLeftNames = [
    'UserProfile', 'AppData',
    'ProgramFiles', 'ProgramFiles(x86)',
    'ProgramFiles(x64)', 'ProgramW6432',
    'HomeDrive'
  ].map((dir) => getEnv(dir.toUpperCase()))
    .filter(Boolean)

  var allMidNames = [
    '', 'nodejs',
    'nodejs\\repl', 'npm'
  ]

  var allRightNames = [
    'atom-node-modules', 'atom-dev-node-modules', 'node_modules',
    '.node_modules', '.node_libraries'
  ]

  var allPaths = new ProductIterable(allLeftNames, allMidNames, allRightNames)
    .map((path) => join(...path))

  module.exports = Object.freeze([...allPaths])
})(module)
