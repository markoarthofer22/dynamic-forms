import React from 'react';
import FormItems from './components/form-items';

import jsonData from './json/form-schema.json';
function App() {
	return (
		<div className="outer-wrapper">
			<FormItems.FormWrapper data={jsonData} submitTitle="Submit test form" title="Form" onSubmit={() => console.log('Clicked submit')} />
		</div>
	);
}

export default App;
