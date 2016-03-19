
module.exports = (json) => {
	'use strict';

	return json ? main() : [];

	function main() {

		var readFileSync = require('fs').readFileSync;

		try {
			return JSON.parse(readFileSync(json, {encoding: 'utf8'}));
		} catch (error) {
			var createErrorDetail = require('../utils/create-error-details.js');
			atom.notifications.addError(`ERROR: ${error}`, createErrorDetail(error));
		}

	}

};
