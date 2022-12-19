import React from 'react';
import FormItems from './components/form-items';

import jsonData from './json/form-schema.json';
function App() {
	function getData(data) {
		console.log('jsonData', jsonData?.params);
		// add validationType
		// add api
		// add send type

		console.log('FORM_DATA', data);
	}

	return (
		<div className="outer-wrapper">
			<FormItems.FormWrapper data={jsonData} submitTitle="Submit test form" title="Form" onSubmit={getData} />
		</div>
	);
}

export default App;
