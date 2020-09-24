const input = document.getElementById("input");
const random = document.getElementById("random");
const recipeEl = document.getElementById("recipe");
const submit = document.getElementById("submit");
const mealName = document.getElementById("nameOfMeal");
const mealDetails = document.getElementById("details");
const image = document.getElementById("searchImg");

console.log(image);

// Search Meal
function searchMeal(e) {
  e.preventDefault();

  // clear Items
  recipeEl.innerHTML = "";
  mealName.innerHTML = "";
  image.innerHTML = "";

  // Get search Item
  const term = input.value;

  if (term.trim()) {
    fetch(`
    https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.meals === null) {
          mealName.innerHTML = `<h1>No Meal Found<h1/>`;
        } else {
          image.innerHTML = data.meals.map(
            (meal) => `
          <a><img src="${meal.strMealThumb}" alt="${meal.strMeal}" /></a>
          <h3>${meal.strMeal}</h3>
          `
          );
          let myData = data.meals[0];
          mealName.innerHTML = `<h1>${myData.strMeal}<h1/>`;
          mealDetails.innerHTML = `<h2>0Origin of meal : ${myData.strArea} <h2/>`;
          recipeEl.innerHTML = `<p>${myData.strInstructions}</p>`;
        }
      });
    //Clear Search
    input.value = "";
  } else {
    alert("Please enter a search term");
  }
}

// Event listeners
submit.addEventListener("click", searchMeal);
