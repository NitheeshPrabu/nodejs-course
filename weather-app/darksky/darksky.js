var request = require('request');

var getWeather = (lat, lon, callback) => {
	request({
		url: `https://api.darksky.net/forecast/e8ef9321c89b3a21cdcb13b7f6f3d5c1/${lat},${lon}`,
		json: true,
		qs: {
			units: 'auto'
		}
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to forcast.io servers');
		} else if (response.statusCode === 400) {
			callback('Unable to fetch the weather');
		} else if (response.statusCode === 200) {
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature
			})
		}
	});
}

module.exports.getWeather = getWeather;