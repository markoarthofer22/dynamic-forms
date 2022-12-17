import React, { useEffect, useState } from 'react';

import './index.scss';

function RadioButton({ name, label, required, options, defaultValue, onChange }) {
	const [, setSelectedValue] = useState(null);

	function handleChange(e) {
		setSelectedValue(options.find((option) => (option.label = e.target.value)));

		if (onChange) onChange(e);
	}

	function renderOptions(groupName) {
		return options?.map((item, index) => {
			return (
				<div key={index} className="radioWrapper">
					<input
						defaultChecked={item.selected || index === 0}
						value={item.label}
						name={groupName || item.name}
						type="radio"
						onClick={handleChange}
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
