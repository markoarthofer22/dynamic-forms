import React, { useEffect, useState } from 'react';
import Button from '../../buttons';
import FormItems from '../index';

function FormWrapper({ onSubmit, data, title, submitTitle = 'Submit' }) {
	const [formData, setFormData] = useState({});
	const [badState, setBadState] = useState(null);

	const handleChange = (e, hasError = false) => {
		let v, t;
		const {
			target: { type, name, value },
		} = e;

		if (type === 'checkbox') {
			t = formData?.[name] || '';

			if (t.error) t = [...t.v];

			if (t !== '' && t?.find((i) => i === value)) {
				v = t?.filter((i) => i !== value);
			} else {
				v = [...t, value];
			}
		} else {
			v = value;
		}

		setFormData((prevState) => {
			return {
				...prevState,
				[e.target.name]: hasError ? { error: true, v } : v,
			};
		});
	};

	function submitForm() {
		let counter = 0;
		let unvalidated = [];
		Object.keys(data).forEach((key) => {
			if (data[key]?.required && !formData[key]) {
				console.log(`${key} - ERROR REQUIRED`);
				counter++;
				unvalidated.push(key);
			}

			if (formData[key]?.error) {
				console.log(`${key} - ERROR`);
				unvalidated.push(key);
				counter++;
			}
		});

		setBadState(unvalidated);

		// ! possible data as param to the callback
		if (counter === 0) onSubmit(formData);
		else alert('Error Occured');
	}

	const renderFormFromJSON = (jsonItem, key, name, triggerValidation) => {
		let C;

		const { help_text, label, placeholder, options, defaultValue, regex, required, choices, type, showPassword } = jsonItem;
		switch (type) {
			case 'string':
				C = (
					<FormItems.Input
						regex={regex}
						required={required}
						onChange={handleChange}
						type="text"
						placeholder={placeholder}
						helpText={help_text}
						label={label}
						name={name}
						triggerValidation={triggerValidation}
					/>
				);
				break;

			case 'integer':
				C = (
					<FormItems.Input
						regex={regex}
						required={required}
						onChange={handleChange}
						type="number"
						placeholder={placeholder}
						helpText={help_text}
						label={label}
						name={name}
						triggerValidation={triggerValidation}
					/>
				);
				break;

			case 'password':
				C = (
					<FormItems.Input
						regex={regex}
						required={required}
						togglePassword={showPassword}
						onChange={handleChange}
						type="password"
						placeholder={placeholder}
						helpText={help_text}
						label={label}
						name={name}
						triggerValidation={triggerValidation}
					/>
				);
				break;

			case 'email':
				C = (
					<FormItems.Input
						regex={regex}
						required={required}
						onChange={handleChange}
						type="email"
						placeholder={placeholder}
						helpText={help_text}
						label={label}
						name={name}
						triggerValidation={triggerValidation}
					/>
				);
				break;

			case 'textarea':
				C = (
					<FormItems.TextArea
						triggerValidation={triggerValidation}
						required={required}
						onChange={handleChange}
						placeholder={placeholder}
						helpText={help_text}
						label={label}
						name={name}
					/>
				);
				break;

			case 'boolean':
				C = <FormItems.RadioButton required={required} label={label} name={name} options={options} onChange={handleChange} />;
				break;
			case 'checkbox':
				C = <FormItems.Checkbox triggerValidation={triggerValidation} required={required} label={label} name={name} options={options} onChange={handleChange} />;
				break;

			case 'dropdown':
				C = (
					<FormItems.Dropdown
						onChange={handleChange}
						name={name}
						helpText={help_text}
						defaultValue={defaultValue}
						placeholder={placeholder}
						label={label}
						data={choices}
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
			<form>
				{Object.keys(data).map((key, index) => key !== 'params' && renderFormFromJSON(data[key], index, key, Boolean(badState?.find((item) => item === key))))}
			</form>

			{onSubmit && <Button title={submitTitle} className="submit" type="submit" onClick={() => submitForm()} />}
		</div>
	);
}

export default FormWrapper;
