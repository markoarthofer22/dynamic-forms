import React, { useState } from 'react';
import FormItems from './components/form-items';

import jsonData from './json/form-schema.json';
function App() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function postData(url = '', fetchOptions, data = {}) {
		// Default options are marked with *
		const defaultFecthParams = fetchOptions || {
			type: 'GET',
			mode: 'cors',
			cache: 'default',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer-when-downgrade',
		};

		const response = await fetch(url, {
			method: defaultFecthParams.type, // *GET, POST, PUT, DELETE, etc.
			mode: defaultFecthParams.mode, // no-cors, *cors, same-origin
			cache: defaultFecthParams.cache, // *default, no-cache, reload, force-cache, only-if-cached
			credentials: defaultFecthParams.credentials, // include, *same-origin, omit
			headers: defaultFecthParams.headers, // 'Content-Type': 'application/x-www-form-urlencoded',
			redirect: defaultFecthParams.redirect, // manual, *follow, error
			referrerPolicy: defaultFecthParams.referrerPolicy, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}

	function getData(data) {
		const { api, fetchOptions } = jsonData?.params;

		console.log('jsonData', jsonData?.params);
		console.log('FORM_DATA BEFORE SENDING', data);
		setIsSubmitting(true);
		postData(api, fetchOptions, { ...data })
			.then((res) => {
				console.log(res); // JSON data parsed by `data.json()` call
				setIsSubmitting(false);
			})
			.catch((err) => {
				alert(err || err.message);
				setIsSubmitting(false);
			});
	}

	return (
		<div className="outer-wrapper">
			<FormItems.FormWrapper data={jsonData} submitTitle="Submit test form" title="Form" isLoading={isSubmitting} onSubmit={getData} />
		</div>
	);
}

export default App;
