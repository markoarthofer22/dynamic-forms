import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { BsFillBackspaceFill, BsInfoCircle } from 'react-icons/bs';
import './index.scss';

const Input = forwardRef((props, ref) => {
	const { type = 'text', name, helpText, value = '', label, className, placeholder, onChange, iconClick, delay, allowClear, defaultValue, errors, ...other } = props;
	const [length, setLength] = useState(value?.length ? value?.length : defaultValue ? defaultValue.length : 0);

	const [stateValue, setStateValue] = useState(value);
	const timeout = useRef();

	const handleChange = (e) => {
		setLength(e.target?.value?.length);
		setStateValue(e.target?.value);

		if (!onChange) return;

		if (delay) {
			clearTimeout(timeout.current);

			timeout.current = setTimeout(() => {
				onChange(e);
			}, delay);
		} else {
			onChange(e);
		}
	};

	const clearInput = () => {
		setLength(0);
		clearTimeout(timeout.current);

		setStateValue('');
		onChange({ target: { name: name, value: '' } });
	};

	useEffect(() => {
		if (defaultValue !== '' && typeof defaultValue !== 'undefined' && typeof value === 'undefined' && defaultValue !== value) {
			onChange({
				target: { type: 'text', name: name, value: defaultValue },
			});
			setLength(defaultValue.length);
			setStateValue(defaultValue);
		}
	}, []);

	useEffect(() => {
		setStateValue(value);
		setLength(value?.length);
	}, [value]);

	return (
		<div className={`formInput ${className || ''}`}>
			{label && <label name={name}>{label}</label>}
			<input ref={ref} type={type} name={name} value={stateValue} placeholder={placeholder} onChange={handleChange} autoComplete="off" {...other} />
			{/* {iconValue && (
				<div onClick={() => (iconClick ? iconClick(value) : null)} className={`rightIcon ${iconClick ? 'clickable' : ''}`}>
					{iconValue}
				</div>
			)} */}

			{allowClear && length > 0 && (
				<div className="clearButton" onClick={() => clearInput()}>
					<BsFillBackspaceFill />
				</div>
			)}

			{helpText && (
				<div className="help-text">
					<BsInfoCircle />
					{helpText}
				</div>
			)}

			{errors?.[name] && <div className="error">{errors?.[name]?.message}</div>}
		</div>
	);
});

export default Input;
