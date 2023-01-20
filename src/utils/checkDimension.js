export const checkDimension = (layouts) => {
	let checkedLayouts = {};

	const checkPosition = (position) => {
		if (position.w === 1 || position.h === 1) {
            console.log('checkDimension => clearing layouts')
            checkedLayouts = {}
        };
	};

	for (var [key, value] of Object.entries(layouts)) {
		value.forEach((position) => checkPosition(position));
	}

	return checkedLayouts;
};
