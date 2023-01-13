import React, { useEffect, useRef, useState } from 'react';
import styles from './MiniCardRecipe.module.css';

import { IoMdClose } from 'react-icons/io';

export const MiniCardRecipe = ({ targetPage, card }) => {
	return (
		<div className={styles.miniCardWrapper}>
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
