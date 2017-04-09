'use strict'

const join = require('path').join
const ProductIterable = require('x-iterable/product-iterable')

const allPaths = new ProductIterable(
  ['~', '~/repl', '/home', '/home/repl', '/usr/share', '/', '/nodejs', '/node'],
  ['atom-node-modules', 'atom-dev-node-modules', 'node_modules', '.node_modules', '.node_libraries']
).map(path => join(...path))

module.exports = Object.freeze([...allPaths, '~/nodejs/lib/node', '~/node/lib/node'])
