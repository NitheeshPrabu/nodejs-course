const request = require('request');

var geocodeAddress = (address, callback) => {
	request({
		url: 'https://us1.locationiq.com/v1/search.php',
		json: true,
		qs: {
			key: '09d8e48d7a1ecf',
			q: address,
			format: 'json'
		}
	}, (error, response, body) => {
		if (error) {
			callback('Could not connect to the locationiq servers');
		} else if (body.error) {
			callback(body.error);
		} else {
			callback(undefined, {
				address: body[0].display_name,
				latitude: body[0].lat,
				longitude: body[0].lon
			});
		}
	});
}

module.exports.geocodeAddress = geocodeAddress;