import React, { useEffect, useState } from 'react';
import Button from '../../buttons';
import FormItems from '../index';

function FormWrapper({ onSubmit, data, title, submitTitle = 'Submit' }) {
	const [formData, setFormData] = useState({});

	const handleChange = (e) => {
		let v, t;
		const {
			target: { type, name, value },
		} = e;

		if (type === 'checkbox') {
			t = formData?.[name] || '';
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
				[e.target.name]: v,
			};
		});
	};

	useEffect(() => {
		console.log('formData, ', formData);
	}, [formData]);

	const renderFormFromJSON = (jsonItem, key, name) => {
		let C;

		const { help_text, label, placeholder, options, defaultValue, regex, required, choices, type, showPassword } = jsonItem;
		switch (type) {
			case 'string':
				// type = 'text', name, value = '', className, onChange, iconClick, delay, allowClear, defaultValue, errors
				C = <FormItems.SimpleInput onChange={handleChange} type="text" placeholder={placeholder} helpText={help_text} label={label} name={name} />;
				break;

			case 'textarea':
				C = <FormItems.TextArea onChange={handleChange} placeholder={placeholder} helpText={help_text} label={label} name={name} />;
				break;

			case 'password':
				C = (
					<FormItems.SimpleInput
						togglePassword={showPassword}
						onChange={handleChange}
						type="password"
						placeholder={placeholder}
						helpText={help_text}
						label={label}
						name={name}
					/>
				);
				break;

			case 'email':
				C = <FormItems.SimpleInput onChange={handleChange} type="email" placeholder={placeholder} helpText={help_text} label={label} name={name} />;
				break;

			case 'boolean':
				C = <FormItems.RadioButton label={label} name={name} options={options} onChange={handleChange} />;
				break;
			case 'checkbox':
				C = <FormItems.Checkbox label={label} name={name} options={options} onChange={handleChange} />;
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
			<form>{Object.keys(data).map((key, index) => renderFormFromJSON(data[key], index, key))}</form>

			{onSubmit && <Button title={submitTitle} className="submit" type="submit" onClick={() => console.log('submitted')} />}
		</div>
	);
}

export default FormWrapper;
