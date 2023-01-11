import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { BsFillBackspaceFill, BsFillEyeFill, BsFillEyeSlashFill, BsInfoCircle } from 'react-icons/bs';
import './index.scss';

const Input = forwardRef((props, ref) => {
	const {
		type = 'text',
		togglePassword,
		name,
		helpText,
		value = '',
		label,
		className,
		placeholder,
		onChange,
		validateOnBlur = false,
		iconClick,
		delay,
		allowClear,
		defaultValue,
		errors,
		required,
		regex,
		triggerValidation = false,
		...other
	} = props;
	const [length, setLength] = useState(value?.length ? value?.length : defaultValue ? defaultValue.length : 0);
	const [enablePassword, setEnablePassword] = useState(false);
	const [stateValue, setStateValue] = useState(value);
	const [inputError, setInputError] = useState(errors);
	const timeout = useRef();
	const internalRef = useRef();

	function validator(value) {
		const requiredType = typeof required === 'boolean' || typeof required === 'string' ? 'boolean' : 'object';

		if (required || required?.isRequired) {
			// this is required field
			if (value?.length <= 0) {
				setInputError({
					error: true,
					msg: requiredType === 'boolean' ? 'This field is required' : required.message,
				});
				return false;
			} else {
				setInputError();
			}

			const testCaseRegex = new RegExp(regex?.isRequired);

			// for now - Single case regex
			if (regex?.isRequired && !testCaseRegex.test(value)) {
				setInputError({
					error: true,
					msg: regex?.message || "This field doesn't match the regex!",
				});
				return false;
			} else {
				setInputError();
			}
		}

		return true;
	}

	function handleChange(e) {
		setLength(e.target?.value?.length);
		setStateValue(e.target?.value);

		const res = validator(e.target?.value);

		if (!onChange) return;

		if (delay) {
			clearTimeout(timeout.current);

			timeout.current = setTimeout(() => {
				onChange(e, !res);
			}, delay);
		} else {
			onChange(e, !res);
		}
	}

	function clearInput() {
		setLength(0);
		clearTimeout(timeout.current);

		setStateValue('');
		onChange({ target: { name: name, value: '' } });
	}

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

	useEffect(() => {
		if (!triggerValidation) return;

		const ev = {
			target: {
				name,
				value: internalRef.current.value,
				type,
			},
		};

		handleChange(ev);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [triggerValidation, internalRef]);

	return (
		<div className={`formInput ${className || ''}`}>
			{label && <label name={name}>{label}</label>}
			<div className="input-wrapper">
				<input
					ref={internalRef || ref}
					type={enablePassword ? 'text' : type}
					name={name}
					placeholder={placeholder}
					className={inputError?.error ? 'is-error' : ''}
					value={!validateOnBlur ? stateValue : undefined}
					defaultValue={validateOnBlur ? stateValue : undefined}
					onChange={!validateOnBlur ? handleChange : null}
					onBlur={validateOnBlur ? handleChange : null}
					autoComplete="off"
					{...other}
				/>
				{inputError?.error && <span error={inputError.msg} />}
				{togglePassword && (
					<div onClick={() => setEnablePassword(!enablePassword)} className="password-icon">
						{enablePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
					</div>
				)}
			</div>

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
		</div>
	);
});

export default Input;
