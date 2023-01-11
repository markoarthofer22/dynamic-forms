import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './index.scss';

function Dropdown({ data, helpText, dropdownClass, placeholder, label, name, onChange, isDefaultOpen = false, defaultValue, className = 'dropdown' }) {
	const [isOpen, setOpen] = useState(isDefaultOpen);
	const [parsedData] = useState(
		Object.keys(data).map((key) => ({
			value: data[key],
			id: key,
		}))
	);
	const [selectedTitle, setSelectedTitle] = useState(null);

	function checkIfSelected() {
		const item = parsedData.find((i) => {
			if (i.id === defaultValue) {
				setSelectedTitle(i.value);
			}
			return i;
		});

		if (onChange)
			onChange({
				target: {
					type: 'dropdown',
					name,
					value: item,
				},
			});
	}

	function toggleDropdown(e) {
		e.preventDefault();
		e.stopPropagation();
		setOpen(!isOpen);
	}

	function selectItem(e, item) {
		e.stopPropagation();
		setOpen(false);
		setSelectedTitle(item.value);
		if (onChange)
			onChange({
				target: {
					type: 'dropdown',
					name,
					value: { ...item },
				},
			});
	}

	useEffect(() => {
		if (!defaultValue) return;

		checkIfSelected();
	}, [defaultValue]);

	return (
		<div id={name || ''} className={`${className || ''} ${dropdownClass || ''}`}>
			{label && (
				<label htmlFor={name || ''} className={`${className}--label`}>
					{label}
				</label>
			)}
			{helpText && (
				<div className="help-text">
					<BsInfoCircle />
					{helpText}
				</div>
			)}
			<div role="button" tabIndex={0} className={`${className}--header ${isOpen ? `${className}--header-open` : ''} `} onClick={(e) => toggleDropdown(e)}>
				{selectedTitle ? (
					<div className={`${className}--header--title`}>{selectedTitle || ''}</div>
				) : (
					<div className={`${className}--header--placeholder`}>{placeholder || ''}</div>
				)}

				<MdKeyboardArrowDown />
			</div>
			<div className={`${className}--list ${isOpen ? `${className}--list-open` : ''}`}>
				{parsedData?.map((item, index) => {
					const isPathURL = item?.link?.substring(0, 1) === '/';

					if (!item.link) {
						return (
							<li
								className={`${className}--item`}
								key={item.id || index}
								onClick={(e) => {
									selectItem(e, item);
								}}
							>
								{item.value}
							</li>
						);
					}
					if (isPathURL) {
						return (
							<Link key={item.id || index} to={item.link}>
								<li className={`${className}--item`}>{item.value}</li>
							</Link>
						);
					}
					return (
						<a key={item.id || index} href={item.link} target="_blank" rel="noreferrer">
							<li className={`${className}--item`}>{item.value}</li>
						</a>
					);
				})}
			</div>
		</div>
	);
}

export default Dropdown;
