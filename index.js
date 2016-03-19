
((module) => {
	'use strict';

	var activate = () => {

		var isIterable = require('x-iterable/utils/is-iterable');
		var DeepIterable = require('x-iterable/deep-iterable');

		var cache = require.cache;
		var resolvePath = require.resolve;

		var requireWithoutCache = (require, path) => {
			var old = Object.getOwnPropertyDescriptor(cache, path);
			delete cache[path];
			var result = require(path);
			old && Object.defineProperty(cache, path, old);
			return result;
		}

		global.requireWithoutCache = (name) => require.withoutCache(name);

		require.withoutCache = (name) =>
			requireWithoutCache(require, resolvePath(name));

			((require) => {
				var call = (name) =>
				requireWithoutCache(require, resolvePath(name));
				require.withoutCache = global.requireWithoutCache = call;
			})(global.require);

			var paths = module.paths;

			var pkgname = require('./package.json').name;
			var requirables = Object.getOwnPropertyNames(require('./config.json'));

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

	};

	module.exports = {
		'config': require('./config.json'),
		'require': require,
		'activate': () => activate(),
		'deactivate': () => atom.notifications.addInfo('You need to reload Atom to completely deactivate this package', {})
	};

})(module);
