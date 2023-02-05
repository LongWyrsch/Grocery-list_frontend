export const checkDimension = (layouts) => {
	console.log('checkDimension called')

	let checkedLayouts = layouts;

	const checkPosition = (position) => {
		// Check that card sizes are not indeed int and >= 2. Otherwise grid layout will crash. 
		if (Number.isInteger(position.w) && Number.isInteger(position.h) && position.w >= 2 && position.h >= 2) {
			return
		};
		console.log('checkDimension => clearing layouts')
		checkedLayouts = {}
	};

	for (var value of Object.values(layouts)) {
		value.forEach((position) => {
			checkPosition(position)
		});

		// If checkedLayouts was set to {}, that means there was an invalid value so all layouts are discarded.
		// The loop is therefore terminated. generateLayouts() will be called.
		if (Object.keys(checkedLayouts).length === 0) {break}
	}

	return checkedLayouts;
};
