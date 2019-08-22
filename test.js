const axios = require('axios');

const key = 'files/bda5b1ac-b4f9-4318-bb81-ad0a7ee64922_sphere.step';
const url = `http://analysis:8080/api/v1/analysis?key=${key}`;

axios.get(encodeURI(url))
	.then(response => {
		console.log(response.status);
		console.log(response.data);
	})
	.catch(err => {
		console.log(err.response);
	});
