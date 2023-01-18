import React, { useState } from 'react';
import styles from './NewList.module.css'

import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';

export const NewList = ({ newList, setNewList, createList, stopPropagation }) => {

	const toggleRecipe = (index) => {
		let newArray = Array.from(newList);
		newArray[index] = { ...newList[index], checked: !newList[index].checked };
		setNewList(newArray);
	};

	return (
		<div className={`card-flat ${styles.newListWrapper}`} onClick={stopPropagation}>
			<h3 className={styles.heading}>Choose some recipes to add to your list.</h3>
			{newList.map((recipe, index) => (
				<div key={index} className={styles.row}>
					<Checkbox checked={recipe.checked} handleChange={() => toggleRecipe(index)} />
					<div>{recipe.title}</div>
				</div>
			))}
            <div className={styles.buttonRow}>
                <Button
                    buttonStyle="outlined"
                    text="Cancel"
                    onClick={() => { setNewList(null) }}
                />
                <Button
                    buttonStyle="filled"
                    text="Create"
                    onClick={createList}
                    iconInfo={{ iconName: 'BsPlusLg', size: '1rem' }}
                />
            </div>
		</div>
	);
};
