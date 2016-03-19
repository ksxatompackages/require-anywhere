
((module) => {
	'use strict';

	var isIterable = require('x-iterable/utils/is-iterable');
	var DeepIterable = require('x-iterable/deep-iterable');

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

	var pkgname = require('./package.json').name;
	var config = require('./config.json');

	var requirables = Object.getOwnPropertyNames(config);

	var getConfigKey = (cname) => `${pkgname}.${cname}`;

	requirables
		.map((cname) => require(`./config/${cname}.js`)(atom.config.get(getConfigKey(cname))))
		.forEach((addend) => paths.push(...new DeepIterable([addend])))
	;

	requirables
		.forEach((cname) => atom.config.onDidChange(getConfigKey(cname), (change) => typeof change.oldValue === 'string' && atom.notifications.addInfo('You need to reload Atom to apply this change', {})))
	;

	paths.push(...require(`./${process.platform === 'win32' ? 'windows' : 'unix'}.js`));
	global.module.paths.push(...paths);

	module.exports = {
		'config': config,
		'deactivate': () => atom.notifications.addInfo('You need to reload Atom to completely deactivate this package', {})
	};

})(module);
