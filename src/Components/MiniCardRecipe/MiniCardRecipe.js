import React, {useEffect, useRef} from 'react';
import styles from './MiniCardRecipe.module.css';

export const MiniCardRecipe = ({ targetPage, card, handleOnClick }) => {

	return (
		<div className={styles.miniCardWrapper}>
			<div className={styles.titleAndDelete}>
				<div className={styles.title}>{card[0].title}</div>
				<span className={styles.deleteButton} onClick={handleOnClick}>
					x
				</span>
			</div>
			<ul>
				{card.slice(0, 15).map((ingredient) => { // Show at most 16 ingredients
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
