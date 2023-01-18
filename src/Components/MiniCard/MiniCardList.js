import React from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import styles from './MiniCard.module.css';

export const MiniCardList = ({ card, focusOnCard }) => {
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
					return (
						<div key={ingredient.uuid} className={styles.row}>
							<Checkbox checked={ingredient.checked} wrapperSize='1rem' boxSize='1rem' checkSize='1rem' disabled={true}/>
							<div className={styles.ingredient}>{ingredient.ingredient}</div>
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
