const express = require('express');
const axios = require('axios');

const app = express();

const {
	token_url1,
	token_url2,
	platform_token,
	baseUrl,
	streamUrl,
} = require('./urls');

let headers = {
	'User-Agent':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
	Referer: 'https://www.zee5.com',
	Accept: '*/*',
	'Accept-Encoding': 'gzip, deflate, br',
	'Accept-Language': 'en-US,en;q=0.9',
	Origin: 'https://www.zee5.com',
	'sec-fetch-dest': 'empty',
	'sec-fetch-mode': 'cors',
	'sec-fetch-site': 'same-site',
};

const config = async () => {
	try {
		const videoToken = await axios.get(token_url1, { headers });

		const x_access_token = await axios.get(platform_token, { headers });
		headers['x-access-token'] = x_access_token.data.token;
		await axios.get(token_url2, { headers });
		return videoToken;
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Something Went Wrong... Try Again',
			data: error.message,
		});
	}
};

app.get('/', (req, res) => {
	res.send('Server is Online');
});

app.get('/media', async (req, res) => {
	let id;
	const url = req.query.url;
	if (!url) {
		res.status(400).json({
			status: 'fail',
			message: 'URL not Found',
		});
	}

	if (url.includes('https://www.zee5.com/movies/')) {
		id = url.split('/')[6];
	} else if (url.includes('https://www.zee5.com/tvshows')) {
		id = url.split('/')[8];
	} else {
		res.status(400).json({
			status: 'fail',
			message: 'URL not Found: Please Enter Correct Url',
		});
	}

	const videoToken = await config();
	try {
		const details = await axios.get(
			baseUrl + id,
			{ headers },
			{ params: { translation: 'en', country: 'IN' } }
		);
		const mediaData = {
			id: details.data.id,
			title: details.data.title,
			image: details.data.image_url,
			duration: Math.floor(details.data.duration / 60) + ' Min',
			description: details.data.description,
			downloadUrl:
				streamUrl +
				details.data.hls[0].replace('drm', 'hls') +
				videoToken.data.video_token,
		};

		res.status(200).json({
			mediaData,
		});
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Something Went Wrong... Try Again',
		});
	}
});

app.listen(3000, () => console.log('Server Running'));
