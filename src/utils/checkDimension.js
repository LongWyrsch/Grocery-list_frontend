export const checkDimension = (layouts) => {
	console.log('checkDimension called')

	let checkedLayouts = layouts;

	const checkPosition = (position) => {
		if (position.w === 1 || position.h === 1) {
            console.log('checkDimension => clearing layouts')
            checkedLayouts = {}
        };
	};

	for (var value of Object.values(layouts)) {
		value.forEach((position) => checkPosition(position));
	}

	return checkedLayouts;
};
