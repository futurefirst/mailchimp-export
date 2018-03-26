
var util = require('util');
var stream = require('stream');

// Split lines
var Split = function () {
	stream.Transform.call(this);
	this.current = '';
};

util.inherits(Split, stream.Transform);

Split.prototype._transform = function (chunk, encoding, callback) {
	chunk = this.current + chunk.toString();
	var lines = chunk.split('\n');
	this.current = lines.pop();

	var self = this;
	lines.forEach(function (line) { self.push(line) });

	callback();
};

Split.prototype._flush = function (callback) {
	this.push(this.current);
	callback();
};

// Output JSON text
var Stringified = function () {
	stream.Transform.call(this);
	this.started = false;
	this.push('[');
};

util.inherits(Stringified, stream.Transform);

Stringified.prototype._transform = function (chunk, encoding, callback) {
	if (this.started) {
		this.push(',');
	} else {
		this.started = true;
	}

	this.push(chunk);
	callback();
};

Stringified.prototype._flush = function (callback) {
	this.push(']');
	callback();
};

// Output JSON objects
var JSONstream = function () {
	stream.Transform.call(this);
	this._readableState.objectMode = true;
};

util.inherits(JSONstream, stream.Transform);

JSONstream.prototype._transform = function (chunk, encoding, callback) {
	try {
		if (chunk) {
			this.push(JSON.parse(chunk));
		}
		callback();
	} catch (error) {
		callback(error);
	}
};

module.exports = {
	split: Split,
	json: JSONstream,
	stringified: Stringified,
};
