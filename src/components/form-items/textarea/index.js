import React, { useState, useRef, forwardRef } from 'react';
import { BsFillBackspaceFill, BsInfoCircle } from 'react-icons/bs';
import './index.scss';

const TextArea = forwardRef((props, ref) => {
	const { value, onChange, delay, helpText, label, placeholder, allowClear, errors, name, ...other } = props;
	const [length, setLength] = useState(value?.length ? value?.length : 0);
	const timeout = useRef();
	const inputRef = useRef();

	const handleChange = (e) => {
		setLength(e.target?.value?.length);
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
		inputRef.current.value = '';
		onChange({ target: { name: other.name, value: '' } });
	};

	return (
		<div className={`formText`}>
			{label && <label name={name}>{label}</label>}
			<textarea {...other} name={name} ref={ref} placeholder={placeholder} onChange={handleChange} autoComplete="off" value={value}></textarea>

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

export default TextArea;
