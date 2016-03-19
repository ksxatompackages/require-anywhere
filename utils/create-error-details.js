
module.exports = (error) => {
	if (error) {
		let stack = error.stack;
		if (stack) {
			return {'detail': stack};
		}
	}
	return {};
}
