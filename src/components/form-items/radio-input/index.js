import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';

import './index.scss';

function RadioButton({ name, label, required, options, defaultValue }) {
	function renderOptions(groupName) {
		return options?.map((item, index) => {
			return (
				<div key={index} className="radioWrapper">
					<input
						defaultChecked={item.selected || index === 0}
						value={item.label}
						name={groupName || item.name}
						type="radio"
						id={item.label}
						disabled={item.disabled}
					/>
					<label htmlFor={item.label} className={item.disabled ? 'disabled' : ''}>
						<span>{item.label}</span>
					</label>
				</div>
			);
		});
	}

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
