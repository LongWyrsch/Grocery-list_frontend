import React from 'react';
import styles from './NewList.module.css'

import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { t } from 'i18next';

export const NewList = ({ newList, setNewList, createList, stopPropagation }) => {

	const toggleRecipe = (index) => {
		let newArray = Array.from(newList);
		newArray[index] = { ...newList[index], checked: !newList[index].checked };
		setNewList(newArray);
	};

	return (
		<div className={`card-flat ${styles.newListWrapper}`} onClick={stopPropagation}>
			<h3 className={styles.heading}>{t('home.NewListMessage')}</h3>
			{newList.map((recipe, index) => (
				<div key={index} className={styles.row} onClick={() => toggleRecipe(index)}>
					<Checkbox checked={recipe.checked}/>
					<div>{recipe.title}</div>
				</div>
			))}
            <div className={styles.buttonRow}>
                <Button
                    buttonStyle="outlined"
                    text={t('general.Cancel')}
                    onClick={() => { setNewList(null) }}
                />
                <Button
                    buttonStyle="filled"
                    text={t('home.Create')}
                    onClick={createList}
                    iconInfo={{ iconName: 'BsPlusLg', size: '1rem' }}
                />
            </div>
		</div>
	);
};
