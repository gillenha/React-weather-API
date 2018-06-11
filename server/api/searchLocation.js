const fetch = require('node-fetch');

module.exports = (app) => {

	let zipcode;

	app.post('/search-location', (req, res) => {
		zipcode = req.body.zipcode;

		if (!zipcode || zipcode.length < 5 || zipcode.length > 5) {
			res.redirect('/error');
		} else {
			res.redirect('/current-weather');
		}
	});

	app.get('/search-location-weather', (req, res) => {
		const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

		const apiKey = '&appid=5942c3048a9d4f58fb3f0195db86b6de';

		const userLocation = (url1, url2, zipcode) => {
			let newUrl = url1 + zipcode + url2;
			return newUrl;
		};

		const apiUrl = userLocation(baseUrl, apiKey, zipcode);

		fetch(apiUrl)
		.then(res => res.join())
		.then(data => {
			res.send({ data });
		})
		.catch(err => {
			res.redirect('/error');
		});

	});

};