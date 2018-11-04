const { getBit } = require('../src/utils');
const assert = require('assert');

describe('getBit', function() {
	it('should return with true', function() {
		assert.strictEqual(getBit(1, 7), true);
	});
});
