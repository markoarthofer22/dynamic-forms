import React from 'react';
import './index.scss';

function Button({ type = 'button', children, className, onClick, title, isLoading, disabled }) {
	return (
		<button
			className={`${className || ''} ${isLoading ? 'button__loading' : ''}`}
			type={type}
			title={title}
			onClick={onClick}
			disabled={isLoading ? true : false || disabled}
		>
			{children} {title}
		</button>
	);
}
export default Button;
