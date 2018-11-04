const setBit = function(word, position, wordLength = 8) {
	const mask = 0x01 << (wordLength - 1 - position);
	return (word |= mask);
};

const getBit = function(word, position, wordLength = 8) {
	const mask = 0x01 << (wordLength - 1 - position);
	return Boolean(word & mask);
};

const forEachBit = function(buffer, callback, wordLength = 8) {
	for (let wordPointer = 0; wordPointer < buffer.length; wordPointer++) {
		for (let bitPointer = 0; bitPointer < wordLength - 1; bitPointer++) {
			callback(buffer[wordPointer], wordPointer, bitPointer);
		}
	}
};

const getBase64Char = function(sextet) {
	return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'[
		sextet
	];
};

module.exports = {
	setBit,
	getBit,
	forEachBit,
	getBase64Char,
};
