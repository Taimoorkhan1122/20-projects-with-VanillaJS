const input = document.getElementById("input");
const random = document.getElementById("random-btn");
const recipeEl = document.getElementById("recipe");
const submit = document.getElementById("submit");
const mealName = document.getElementById("nameOfMeal");
const mealDetails = document.getElementById("details");
const image = document.getElementById("searchImg");
const ingredientsEl = document.getElementById("ingredients");
console.log(image);

//Update Recipe
function updateRecipe(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.meals === null) {
        recipeEl.innerHTML = `<p>Something went wrong</p>`;
      } else {
        let meal = data.meals[0];
        mealName.innerHTML = `<h1>${meal.strMeal}<h1/>`;
        mealDetails.innerHTML = `<h2>Origin of meal : ${meal.strArea} <h2/>`;
        recipeEl.innerHTML = `<p>${meal.strInstructions}</p>`;

        addIngredients(meal);
      }
    });
}

function addIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  ingredientsEl.innerHTML = `
    <h2>Ingredients</h2>
    <div class="tags" id="tags">
    ${ingredients.map((ing) => `<p id="ingreds">${ing}</p>`).join("")}
    </div>
  `;
  console.log(ingredients);
}

// Search Meal
function searchMeal(e) {
  e.preventDefault();

  // clear Items
  recipeEl.innerHTML = "";
  mealName.innerHTML = "";
  mealDetails.innerHTML = "";
  image.innerHTML = "";
  ingredients.innerHTML = "";

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
            <div class="meals">
              <a href="#">
                <img onclick="updateRecipe(${meal.idMeal})" 
                src="${meal.strMealThumb}" 
                alt="${meal.strMeal}" />
              </a>
              <h3>${meal.strMeal}</h3>
            </div>
          `
          );
          mealName.innerHTML = "Seleact A Meal";
          recipeEl.innerHTML = `<p>Please Select A dish to get the recipe</p>`;
          ingredients.innerHTML = "";
        }
      });
    //Clear Search
    input.value = "";
  } else {
    alert("Please enter a search term");
  }
}

// Get RandomMeal
function getRandomMeal() {
  recipeEl.innerHTML = "";
  mealName.innerHTML = "";
  image.innerHTML = "";

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      // let id;
      // for (const meal of data.meals) {
      //   id = meal.idMeal;
      // }
      // updateRecipe(id);

      if (data.meals === null) {
        mealName.innerHTML = `<h1>No Meal Found<h1/>`;
      } else {
        image.innerHTML = data.meals.map(
          (meal) => `
          <div class="meals">
            <a href="#">
              <img onclick="updateRecipe(${meal.idMeal})" 
              src="${meal.strMealThumb}" 
              alt="${meal.strMeal}" />
            </a>
            <h3>${meal.strMeal}</h3>
          </div>
        `
        );
        mealName.innerHTML = "Seleact A Meal";
        recipeEl.innerHTML = `<p>Please Select A dish to get the recipe</p>`;
        ingredients.innerHTML = "";
      }
    });
}

// Event listeners
submit.addEventListener("click", searchMeal);
random.addEventListener("click", getRandomMeal);
