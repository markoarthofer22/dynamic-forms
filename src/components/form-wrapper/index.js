import React from 'react';
import Button from '../buttons';
import FormItems from '../form-items/index';

function FormWrapper({ onSubmit, data, title, submitTitle = 'Submit' }) {
	const renderFormFromJSON = (jsonItem, key, name) => {
		let C;

		const { help_text, label, placeholder, options, regex, required, type } = jsonItem;
		switch (type) {
			case 'string':
				// type = 'text', name, value = '', className, onChange, iconClick, delay, allowClear, defaultValue, errors
				C = <FormItems.SimpleInput type="text" placeholder={placeholder} helpText={help_text} label={label} name={name} />;
				break;

			case 'textarea':
				C = <FormItems.TextArea placeholder={placeholder} helpText={help_text} label={label} name={name} />;
				break;

			case 'password':
				C = <FormItems.SimpleInput type="password" placeholder={placeholder} helpText={help_text} label={label} name={name} />;
				break;

			case 'boolean':
				C = (
					<FormItems.RadioButton
						label={label}
						name={name}
						options={options}
						// onChange={handleChange}
					/>
				);
				break;

			default:
				break;
		}

		return (
			<div key={key} className="form-item-wrapper">
				{C}
			</div>
		);
	};

	return (
		<div>
			{title && <h2>{title}</h2>}
			<form>{Object.keys(data).map((key, index) => renderFormFromJSON(data[key], index, key))}</form>

			{onSubmit && <Button title={submitTitle} className="submit" type="submit" onClick={() => console.log('submitted')} />}
		</div>
	);
}

export default FormWrapper;
