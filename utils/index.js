
/**
 * getData()
 *
 * @param {string} URL - URL to fetch data from.
 * @returns {array of data} return the array of data from api.
 */
import axios from "axios"
const getData = async (url) => {

    const response = await axios.get(url)
    const data = response.data
    return data;

}
const getIngredientsList = (recipeDetails) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        if (recipeDetails[ingredientKey]) {
            const ingredient = `${recipeDetails[ingredientKey]} - ${recipeDetails[measureKey] || 'N/A'}`;
            ingredients.push(ingredient);
        } else {
            break;
        }
    }
    return ingredients;
};
// function bubbleSortRecipesByName(recipeArray) {
//     const n = recipeArray.length;
//     for (let i = 0; i < n - 1; i++) {
//         for (let j = 0; j < n - i - 1; j++) {
//             if (recipeArray[j].strMeal.trim().localeCompare(recipeArray[j + 1].strMeal.trim()) == 1) {
//                 // Swap the elements
//                 let temp = recipeArray[j];
//                 recipeArray[j] = recipeArray[j + 1];
//                 recipeArray[j + 1] = temp;
//             }
//         }
//     }
// }
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let resultArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].strMeal.trim().toLowerCase() < right[rightIndex].strMeal.trim().toLowerCase()) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}


export { getData, getIngredientsList, merge, mergeSort }