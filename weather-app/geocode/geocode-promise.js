const request = require('request');

var geocodeAddress = (address) => {
	return new Promise((resolve, reject) => {
		var encodedAddress = encodeURIComponent(address);
		
		request({
			url: 'https://us1.locationiq.com/v1/search.php',
			json: true,
			qs: {
				key: '09d8e48d7a1ecf',
				q: encodedAddress,
				format: 'json'
			}
		}, (error, response, body) => {
			if (error) {
				reject('Could not connect to the locationiq servers');
			} else if (body.error) {
				reject(body.error);
			} else {
				resolve({
					address: body[0].display_name,
					latitude: body[0].lat,
					longitude: body[0].lon
				});
			}
		});
	});
}

geocodeAddress('600087').then((location) => {
	console.log(location);
}, (error) => {
	console.log(error);
});

module.exports.geocodeAddress = geocodeAddress;