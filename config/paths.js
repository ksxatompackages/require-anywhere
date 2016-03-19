
module.exports = (script) => {
	'use strict';

	module.exports = script ? main() : [];

	function main() {

		var vm = require('vm');
		var env = process.env;

		var context = {
			'path': require('path'),
			'xiter': require('x-iterable'),
			'sfu': require('simple-function-utils'),
			'__proto__': {
				'env': env,
				'require': require,
				'__proto__': env
			}
		};

		try {
			return vm.runInNewContext(script, context);
		} catch (error) {
			var createErrorDetail = require('../utils/create-error-details.js');
			atom.notifications.addError(`ERROR: ${error}`, createErrorDetail(error));
		}

	}

};
