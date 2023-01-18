import React from 'react';
import styles from './MiniCard.module.css';

export const MiniCardRecipe = ({ card, focusOnCard }) => {
	// onMouse actions only work in on separate div than the one used by react-grid-layout since it uses them for drag drop actions.
	let cursorMoved = true;
	let downListener = () => (cursorMoved = false);
	let moveListener = () => (cursorMoved = true);
	let upListener = () => {
		if (cursorMoved === false) {
			focusOnCard(card);
		}
	};

	return (
		<div className={`card-elevated ${styles.cardContainer}`} onMouseDown={downListener} onMouseMove={moveListener} onMouseUp={upListener}>
			<div className={styles.title}>{card[0].title}</div>
			<ul>
				{card.slice(0, 15).map((ingredient) => {
					// Show at most 16 ingredients
					let quantity = ingredient.quantity ? ingredient.quantity : '';
					let unit = ingredient.unit ? ingredient.unit : '';
					return (
						<div key={ingredient.uuid} className={styles.row}>
							<div className={styles.ingredient}>{ingredient.ingredient}</div>
							<div className={styles.quantityAndUnit}>{`${quantity} ${unit}`}</div>
						</div>
					);
				})}
			</ul>
			{card.length > 15 && (
				<div className={`${styles.ellipsis} ${styles.row}`}>
					<div className={styles.ellipsis}>...</div>
					<div className={styles.ellipsis}>...</div>
				</div>
			)}
		</div>
	);
};
