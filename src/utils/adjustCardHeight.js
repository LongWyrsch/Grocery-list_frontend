export const adjustCardHeight = (rowNumber) => {
    console.log('adjustCardHeight called')
	let cardHeight = 0;
	if (rowNumber <= 3) {
		cardHeight = 2;
	} else if (rowNumber <= 7) {
		cardHeight = 3;
	} else if (rowNumber <= 11) {
		cardHeight = 4;
	} else {
		cardHeight = 5;
	}
	return cardHeight;
};