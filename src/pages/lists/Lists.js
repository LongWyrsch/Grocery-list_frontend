import React from 'react';

export const Lists = () => {
	const logout = () => {
		window.open('http://localhost:3000/logout', '_self');
	};

	return (
		<div>
            <h1 className='generalText'>Lists</h1>
		</div>
	);
};
