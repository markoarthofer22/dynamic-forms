import React from 'react';
import FormWrapper from './components/form-wrapper';
import jsonData from './json/form-schema.json';
function App() {
	return (
		<div className="outer-wrapper">
			<FormWrapper data={jsonData} submitTitle="Submit test form" title="Form" onSubmit={() => console.log('Clicked submit')} />
		</div>
	);
}

export default App;
