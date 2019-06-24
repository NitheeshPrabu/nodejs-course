const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const darksky = require('./darksky/darksky');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		console.log(results.address);
		darksky.getWeather(results.latitude, results.longitude, (errorMessage, results) => {
			if (errorMessage) {
				console.log(errorMessage);
			} else {
				console.log(`It's currently ${results.temperature} °C, but it feels like ${results.apparentTemperature} °C`);
			}
		});
	}
});