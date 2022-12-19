import React, { useEffect, useState } from 'react';

import './index.scss';

function RadioButton({ name, label, required, options, defaultValue, onChange }) {
	const [, setSelectedValue] = useState(null);
	const [inputError, setInputError] = useState({ error: false, msg: '' });

	function validator(value) {
		const requiredType = typeof required === 'boolean' ? 'boolean' : 'object';

		if (required || required?.isRequired) {
			// this is required field
			if (!value) {
				setInputError({
					error: true,
					msg: requiredType === 'boolean' ? 'This field is required' : required.message,
				});
				return false;
			} else {
				setInputError();
			}
		}

		return true;
	}

	function handleChange(e) {
		const res = validator(e.target?.value);

		if (!res) return;

		setSelectedValue(options.find((option) => option.label === e.target.value));

		if (onChange) onChange(e);
	}

	function renderOptions(groupName) {
		return options?.map((item, index) => {
			return (
				<div key={index} className="radioWrapper">
					<input
						defaultChecked={item.selected || index === 0}
						value={item.label}
						className={inputError?.error ? 'is-error' : ''}
						name={groupName || item.name}
						type="radio"
						onClick={handleChange}
						id={item.label}
						disabled={item.disabled}
					/>
					{inputError?.error && <span error={inputError.msg} />}
					<label htmlFor={groupName || item.label} className={item.disabled ? 'disabled' : ''}>
						<span>{item.label}</span>
					</label>
				</div>
			);
		});
	}

	useEffect(() => {
		let i = 0;
		options.forEach((option) => {
			if (option?.selected) {
				i += 1;
				setSelectedValue(option);

				if (onChange)
					onChange({
						target: {
							type: 'radio',
							name: name,
							value: option.label,
						},
					});
			}
		});

		if (i === 0) {
			setSelectedValue(options[0]);
			if (onChange)
				onChange({
					target: {
						type: 'radio',
						name: name,
						value: options[0].label,
					},
				});
		}
	}, []);

	return (
		<div className="customToggle">
			<fieldset>
				{label && <legend className="legend">{label}</legend>}
				{options ? <div className="wrapper">{renderOptions(name)}</div> : <div className="wrapper">No values</div>}
			</fieldset>
		</div>
	);
}

export default RadioButton;
