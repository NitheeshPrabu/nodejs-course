const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

var geocodeUrl = 'https://us1.locationiq.com/v1/search.php';

axios.get(geocodeUrl, {
	params: {
		key: '09d8e48d7a1ecf',
		q: argv.address,
		format: 'json'
	}
}).then((response) => {
	if (response.status === 200) {
		console.log(response.data[0].display_name);
		var {lat, lon} = response.data[0];
		var darkskyUrl = `https://api.darksky.net/forecast/e8ef9321c89b3a21cdcb13b7f6f3d5c1/${lat},${lon}`;
		return axios.get(darkskyUrl, {
			params: {
				units: 'auto'
			}
		});
	}
}).then((response) => {
	var { temperature, apparentTemperature } = response.data.currently;
	console.log(`It's currently ${temperature} °C, but it feels like ${apparentTemperature} °C`)
}).catch((e) => {
	if (e.code === 'ENOTFOUND')
		console.log('Unable to connect to locationiq servers');
	else if (e.response.status >= 400) {
		console.log(e.response.data.error);
	}
});