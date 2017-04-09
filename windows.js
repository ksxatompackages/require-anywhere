'use strict'

const join = require('path').join
const ProductIterable = require('./product-iterable.js')

const env = process.env
const keys = [...Object.keys(env), ...Object.getOwnPropertyNames(env)]

const getEnv = vname =>
  env[keys.find(name => name.toUpperCase() === vname)] || ''

const allLeftNames = [
  'UserProfile', 'AppData',
  'ProgramFiles', 'ProgramFiles(x86)',
  'ProgramFiles(x64)', 'ProgramW6432',
  'HomeDrive'
].map(dir => getEnv(dir.toUpperCase()))
  .filter(Boolean)

const allMidNames = [
  '', 'nodejs',
  'nodejs\\repl', 'npm'
]

const allRightNames = [
  'atom-node-modules', 'atom-dev-node-modules', 'node_modules',
  '.node_modules', '.node_libraries'
]

const allPaths = new ProductIterable(allLeftNames, allMidNames, allRightNames)
  .map(path => join(...path))

module.exports = Object.freeze([...allPaths])
