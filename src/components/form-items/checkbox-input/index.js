import React, { useEffect, useRef, useState } from 'react';

import './index.scss';

function Checkbox({ name, label, required, options, defaultValue, onChange, triggerValidation }) {
	const [selectedVal, setSelectedValue] = useState([]);
	const [inputError, setInputError] = useState({ error: false, msg: '' });
	const internalRef = useRef();

	function validator(newArray) {
		const arr = newArray || selectedVal;
		const requiredType = typeof required === 'boolean' ? 'boolean' : 'object';

		if (required || required?.isRequired) {
			// this is required field
			if (arr.length === 0) {
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
		const event = e?.target?.value === null ? undefined : e;

		if (selectedVal.find((item) => item.label === e.target.value)) {
			const tempNewArray = selectedVal.filter((item) => item.label !== e.target.value);
			const res = validator(tempNewArray);

			if (!res) {
				setSelectedValue(tempNewArray);

				if (onChange && event) onChange(e, true);
				return;
			}

			setSelectedValue(tempNewArray);
			if (onChange && event) onChange(e);
			return;
		}

		const newValue = options.find((option) => option.label === e.target.value);

		const res = validator(newValue);

		if (!res) {
			setSelectedValue([]);
			if (onChange && event) onChange(e, true);
			return;
		} else {
			setSelectedValue([...selectedVal, newValue]);
		}

		if (onChange) onChange(e);
	}

	function renderOptions(groupName) {
		return options?.map((item, index) => {
			return (
				<div key={index} className="checkboxWrapper">
					<input
						ref={internalRef}
						defaultChecked={item.selected}
						value={item.label}
						name={groupName || item.name}
						type="checkbox"
						onChange={handleChange}
						id={item.label}
						disabled={item.disabled}
					/>
					<label htmlFor={groupName || item.label} className={item.disabled ? 'disabled' : ''}>
						<span>{item.label}</span>
					</label>
				</div>
			);
		});
	}

	useEffect(() => {
		options.forEach((option) => {
			if (option?.selected) {
				setSelectedValue([...selectedVal, option]);

				if (onChange)
					onChange({
						target: {
							type: 'checkbox',
							name,
							value: option.label,
						},
					});
			}
		});
	}, []);

	useEffect(() => {
		if (!triggerValidation) return;

		// console.log('triggerValidation', selectedVal);

		const ev = {
			target: {
				name,
				value: null,
				type: 'checkbox',
			},
		};

		handleChange(ev);
	}, [triggerValidation]);

	return (
		<div className="customCheckbox">
			<fieldset>
				{label && <legend className="legend">{label}</legend>}
				{options ? (
					<div className="wrapper">
						{renderOptions(name)}
						{inputError?.error && <span className="field-error" error={inputError.msg} />}
					</div>
				) : (
					<div className="wrapper">No values</div>
				)}
			</fieldset>
		</div>
	);
}

export default Checkbox;
