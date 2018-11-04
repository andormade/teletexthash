const { setBit, getBit, forEachBit, getBase64Char } = require('./utils');

const ROWS = 25;
const COLS = 40;
const TELETEXT_WORD_LENGTH = 7;
const BASE_64_WORD_LENGTH = 6;
const BASE_64_BUFFER_LENGTH = Math.ceil(
	(ROWS * COLS * TELETEXT_WORD_LENGTH) / BASE_64_WORD_LENGTH
);

const encode = function(teletextBuffer, params = {}, characterSet = 0) {
	const b64 = new Array(BASE_64_BUFFER_LENGTH).fill(0);

	forEachBit(teletextBuffer, function(word, wordPointer, bitPointer) {
		const position = TELETEXT_WORD_LENGTH * wordPointer + bitPointer;
		const b64bitoffset = position % BASE_64_WORD_LENGTH;
		const b64charoffset = (position - b64bitoffset) / BASE_64_WORD_LENGTH;

		if (getBit(word, bitPointer, TELETEXT_WORD_LENGTH)) {
			b64[b64charoffset] = setBit(
				b64[b64charoffset],
				b64bitoffset,
				BASE_64_WORD_LENGTH
			);
		}
	});

	let hash = `#${characterSet}:` + b64.map(getBase64Char).join('');

	Object.keys(params).forEach(function(key) {
		hash += `:${key}=${params[key]}`;
	});

	return hash;
};

module.exports = {
	encode,
};
