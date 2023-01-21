export const groupBy = (recipes) => {

    let ungroupedList = []
    recipes.forEach((recipe) => { ungroupedList = [...ungroupedList, ...recipe] })    

    let groupedList = []

    while (ungroupedList.length > 1) {
        let currentIngredient = ungroupedList.shift()
        let quantity = currentIngredient.quantity
        
        let i = 0
        let searchArray = Array.from(ungroupedList)
        while (i < searchArray.length) {
            let searchRow = searchArray[i]
        // for (const searchRow of ungroupedList) {
            if (currentIngredient.ingredient === searchRow.ingredient && currentIngredient.unit === searchRow.unit && currentIngredient.section === searchRow.section) {
                quantity += searchRow.quantity
                searchArray.splice(i, 1)
            } else {
                i += 1
            }
        }


        groupedList.push({
            user_uuid: 'a8eefbb0-9e50-4c00-b18f-798f2b951633',
            ingredient: currentIngredient.ingredient,
            quantity: quantity,
            unit: currentIngredient.unit,
            section: currentIngredient.section
        })

        ungroupedList = searchArray
    }

    return groupedList
};
