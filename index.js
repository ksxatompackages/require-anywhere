'use strict'

var {atom} = global

var activate = () => {
  var cache = require.cache
  var resolvePath = require.resolve

  var requireWithoutCache = (require, path) => {
    var old = Object.getOwnPropertyDescriptor(cache, path)
    delete cache[path]
    var result = require(path)
    old && Object.defineProperty(cache, path, old)
    return result
  }

  global.requireWithoutCache = (name) => require.withoutCache(name)

  require.withoutCache = (name) =>
    requireWithoutCache(require, resolvePath(name));

  ((require) => {
    var call = (name) =>
      requireWithoutCache(require, resolvePath(name))
    require.withoutCache = global.requireWithoutCache = call
  })(global.require)

  var paths = module.paths

  var pkgname = require('./package.json').name
  var requirables = Object.getOwnPropertyNames(require('./config.json'))

  var getConfigKey = (cname) => `${pkgname}.${cname}`

  for (let cname of requirables) {
    let key = getConfigKey(cname)
    let addend = require(`./config/${cname}.js`)(atom.config.get(key))
    paths.push(...addend)
    atom.config.onDidChange(key, (change) => onConfigChanged(change))
  }

  var onConfigChanged = (change) => {
    typeof change.oldValue === 'string' && atom.notifications.addInfo('You need to reload Atom to apply this change', {})
    onConfigChanged = () => {}
  }

  paths.push(...require(`./${process.platform === 'win32' ? 'windows' : 'unix'}.js`))
  global.module.paths.push(...paths)
}

module.exports = {
  'config': require('./config.json'),
  'require': require,
  'activate': () => activate(),
  'deactivate': () => atom.notifications.addInfo('You need to reload Atom to completely deactivate this package', {})
}
