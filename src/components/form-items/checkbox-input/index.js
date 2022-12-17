import React, { useEffect, useState } from 'react';

import './index.scss';

function Checkbox({ name, label, required, options, defaultValue, onChange }) {
	const [selectedVal, setSelectedValue] = useState([]);

	function handleChange(e) {
		if (selectedVal.find((item) => item.label === e.target.value)) {
			setSelectedValue(selectedVal.filter((item) => item.label !== e.target.value));
			if (onChange) onChange(e);
			return;
		}

		const newValue = options.find((option) => (option.label = e.target.value));

		setSelectedValue([...selectedVal, newValue]);

		if (onChange) onChange(e);
	}

	function renderOptions(groupName) {
		return options?.map((item, index) => {
			return (
				<div key={index} className="checkboxWrapper">
					<input
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

	return (
		<div className="customCheckbox">
			<fieldset>
				{label && <legend className="legend">{label}</legend>}
				{options ? <div className="wrapper">{renderOptions(name)}</div> : <div className="wrapper">No values</div>}
			</fieldset>
		</div>
	);
}

export default Checkbox;
