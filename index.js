'use strict'

const {atom} = global

const activate = () => {
  const cache = require.cache
  const resolvePath = require.resolve

  const requireWithoutCache = (require, path) => {
    const old = Object.getOwnPropertyDescriptor(cache, path)
    delete cache[path]
    const result = require(path)
    old && Object.defineProperty(cache, path, old)
    return result
  }

  global.requireWithoutCache = (name) => require.withoutCache(name)

  require.withoutCache = (name) =>
    requireWithoutCache(require, resolvePath(name));

  ((require) => {
    const call = (name) =>
      requireWithoutCache(require, resolvePath(name))
    require.withoutCache = global.requireWithoutCache = call
  })(global.require)

  const paths = module.paths

  const pkgname = require('./package.json').name
  const requirables = Object.getOwnPropertyNames(require('./config.json'))

  const getConfigKey = (cname) => `${pkgname}.${cname}`

  for (let cname of requirables) {
    let key = getConfigKey(cname)
    let addend = require(`./config/${cname}.js`)(atom.config.get(key))
    paths.push(...addend)
    atom.config.onDidChange(key, (change) => onConfigChanged(change))
  }

  let onConfigChanged = (change) => {
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
