mailchimp-export
================

Skip the memory! Handle large Mailchimp Export API datasets with `Stream`s.

Installation
------------

	$ npm install mailchimp-export


Usage
-----

```javascript
var fs = require('fs');
var api = require('mailchimp-export');

api.list({ id: 'a1b2c3', apikey: 'f9e8d7-us3' })
	.pipe(fs.createWriteStream('./output.json'));

api.options.apikey = 'f9e8d7-us3';

api.ecommOrders().pipe(res);
api.campaignSubscriberActivity({ id: '010203' }).pipe(res);
```

Defaults
---------------

```javascript
api.options = {
	https: true,
	apikey: '',
	streamMode: 'stringified', // 'json'

	host: 'api.mailchimp.com',
	path: '/export/1.0/',
	method: 'POST',
}
```
## API

Every method returns a `ReadableStream` and requires an `apikey`.

#### `api.list(options || api.options)`

- **`apikey`**, **`id`**, `status`, `segment`, `since`, `hashed`.

#### `api.ecommOrders(options || api.options)`

- **`apikey`**, `since`.

#### `api.campaignSubscriberActivity(options || api.options)`

- **`apikey`**, **`id`**, `since`, `include_empty`.
