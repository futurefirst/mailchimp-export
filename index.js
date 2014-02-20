
var request = require('request');
var streams = require('./streams.js');

var default_options = {
	https: true,
	apikey: '',
	streamMode: 'stringified', // 'json'

	host: 'api.mailchimp.com',
	path: '/export/1.0/',
	method: 'POST',
};

var set = function (options, name) {
	options[name] = (undefined !== options[name]) ? options[name] : default_options[name];
};

var api = function (method, params, options) {

	if (options) {
		set( options, 'https'  );
		set( options, 'host'   );
		set( options, 'path'   );
		set( options, 'method' );
		set( options, 'streamMode' );
	} else {
		options = default_options;
	}

	params = params || {};

	set(params, 'apikey');

	var dc = 'us1';
	var parts = params.apikey.split('-');

	if (parts.length === 2) {
		dc = parts[1];
	}

	var protocol = options.https ? 'https://' : 'http://';
	var host = dc + '.' + options.host;
	var uri = protocol + host + options.path + method;

	return request({ method: options.method, uri: uri, form: params }).
		pipe(new streams.split()).
		pipe(new streams[options.streamMode]());

}

var expose = function (method) {
	module.exports[method] = function (options, name) {
		return api(method + '/', options, name);
	};
};

expose('list');
expose('ecommOrders');
expose('campaignSubscriberActivity');

module.exports.options = default_options;
