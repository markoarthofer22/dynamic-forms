import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { BsFillBackspaceFill, BsInfoCircle } from 'react-icons/bs';
import './index.scss';

const TextArea = forwardRef((props, ref) => {
	const {
		value,
		triggerValidation,
		onChange,
		required,
		regex,
		delay,
		helpText,
		label,
		placeholder,
		allowClear,
		errors,
		name,
		validateOnBlur = false,
		...other
	} = props;
	const [length, setLength] = useState(value?.length ? value?.length : 0);
	const timeout = useRef();
	const inputRef = useRef();
	const [inputError, setInputError] = useState(errors);
	const internalRef = useRef();

	function validator(value) {
		const requiredType = typeof required === 'boolean' ? 'boolean' : 'object';

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

		const res = validator(e.target?.value);

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
		inputRef.current.value = '';
		onChange({ target: { name: other.name, value: '' } });
	}

	useEffect(() => {
		if (!triggerValidation) return;

		const ev = {
			target: {
				name,
				value: internalRef.current.value,
			},
		};

		handleChange(ev);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [triggerValidation, ref]);

	return (
		<div className={`formText`}>
			{label && <label name={name}>{label}</label>}
			<textarea
				className={inputError?.error ? 'is-error' : ''}
				name={name}
				ref={internalRef || ref}
				placeholder={placeholder}
				autoComplete="off"
				value={!validateOnBlur ? value : undefined}
				defaultValue={validateOnBlur ? value : undefined}
				onChange={!validateOnBlur ? handleChange : null}
				onBlur={validateOnBlur ? handleChange : null}
				{...other}
			></textarea>
			{inputError?.error && <span error={inputError.msg} />}
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

export default TextArea;
