
((module) => {
	'use strict';

	var cache = require.cache;
	var resolvePath = require.resolve;

	var requireWithoutCache = (require, path) => {
		delete cache[path];
		return require(path);
	}

	global.requireWithoutCache = (name) => require.withoutCache(name);

	require.withoutCache = (name) =>
		requireWithoutCache(require, resolvePath(name));

	((require) => {
		var call = (name) =>
			requireWithoutCache(require, resolvePath(name));
		require.withoutCache = global.requireWithoutCache = call;
	})(global.require);

	global.requireGlobal = require;

	var paths = module.paths;
	paths.push(...require(`./${process.platform === 'win32' ? 'windows' : 'unix'}.js`));
	global.module.paths.push(...paths);

	module.exports = {
		'config': require('./config.json'),
		'deactivate': () => atom.notifications.addInfo('You need to reload Atom to completely deactivate this package', {})
	};

})(module);
