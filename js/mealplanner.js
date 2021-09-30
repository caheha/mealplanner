// Import
import Recipe from './recipe.js';
import FoodPlan from './foodPlan.js';
import ShoppingList from './shoppingList.js';

// Arrays for creating recipe and shoppingList
let ingredients = [];
let procedures = [];
let shoppingListIngredients = [];

// MealPlanner class
export default class MealPlanner {
    constructor(domElement, user) {
        this.domElement = domElement;
        this.user = user;
        this.baseUrl = "./json/recipes.json";
        this.allRecipes = [];
        this.shownRecipes = [];
        this.currentUser = {};
        this.init();
    }

    // Fetch recipes, append to pages
    async init() {
        await this.fetchRecipes();
        this.shownRecipes = this.allRecipes;

        this.appendRecipes(this.allRecipes);
        this.appendFavorites(this.user.favorites, this.user.myRecipes);
        this.appendFoodPlans();
        this.appendShoppingLists();
    }

    // Natascha - Fetches recipe json, creates Recipe from each
    async fetchRecipes() {
        let response = await fetch(this.baseUrl);
        let data = await response.json();
        for (const recipe of data) {
            this.allRecipes.push(new Recipe(recipe.title, recipe.description, recipe.img, recipe.rating, 
                                         recipe.time, recipe.price, recipe.country, recipe.glutenfree, recipe.vegetarian, 
                                         recipe.vegan, recipe.sugarfree, recipe.dairyfree, recipe.season, 
                                         recipe.theme, recipe.holiday, recipe.ingredients, recipe.procedure));
        }
        return this.allRecipes;
    }
        
    // Natascha - Appends recipe HTML to page
    appendRecipes(recipes) {
        let container = this.domElement.querySelector("#recipes-container");

        let html = "";
        for (const recipe of recipes) {                        
            html += recipe.getHtml();
        }
        container.innerHTML = html;
    }

    // Natascha - Appends favorites HTML to page
    appendFavorites(favorites, ownRecipes) {
        // Favorites
        const favoritesContainer = this.domElement.querySelector("#favorites-container");
        let html = "";
        if (favorites.length == 0) {
            html += "<p class='small-text'>Du har ingen favoritter der matchede din søgning, " + 
                    "eller så har du ikke tilføjet nogle endnu.</p>";
        } else {
            for (const recipe of favorites) {                        
                html += recipe.getHtml();
            }
        }
        favoritesContainer.innerHTML = html;

        // Own recipes
        const ownRecipesContainer = this.domElement.querySelector("#own-recipes-container");
        let ownRecipesHtml = "";
        if (ownRecipes.length == 0) {
            ownRecipesHtml += "<p class='small-text'>Du har ingen opskrifter der matchede din søgning, " +
                              "eller så har du ikke tilføjet nogle endnu.</p>";
        } else {
            for (const recipe of ownRecipes) {                        
                ownRecipesHtml += recipe.getHtml();
            }
        }
        ownRecipesContainer.innerHTML = ownRecipesHtml;
        
        // Update favorite icon state
        this.updateFavoriteIcons();
    }

    // Natascha - Makes favorite icon green if recipe is in favorite array
    updateFavoriteIcons() {
        const favoriteIcons = this.domElement.querySelectorAll(".favorite");
        for (const icon of favoriteIcons) {
            let id = icon.id.slice(7)

            if (this.user.favorites.find(recipe => recipe.id == id)) {
                icon.style.color = "var(--green)";
                icon.innerHTML = "favorite";
            } else {
                icon.style.color = "var(--text-color-dark)";
                icon.innerHTML = "favorite_outline";
            }
        }
    }

    // Natascha - Appends food plans to page
    appendFoodPlans() {
        const container = this.domElement.querySelector("#foodplans-container");
        let html = "";
        for (const foodPlan of this.user.foodPlans) {
            html = foodPlan.getHtml() + html;
        }
        if (this.user.foodPlans.length == 0) {
            html = "<p class='small-text'>Du har ikke oprettet en madplaner endnu, du kan oprette en " +
                   "ved at trykke på '+' i øverste højre hjørne.</p>";
        }
        container.innerHTML = html;
    }

    // Casper - Appends shopping lists to page
    appendShoppingLists() {
        const container = this.domElement.querySelector("#shoppinglists-container");
        let html = "";
        for (const shoppingList of this.user.shoppingLists) {                        
            html += shoppingList.getHtml();
        }
        if (this.user.shoppingLists.length == 0) {
            html = "<p class='small-text'>Du har ikke oprettet en indkøbslister endnu, du kan oprette en " +
                   "ved at trykke på '+' i øverste højre hjørne.</p>";
        } 
        container.innerHTML = html;
    }

    // Natascha - Add or remove favorite from user
    favorite(id) {
        if (!this.user.favorites.find(recipe => recipe.id == id)) {
            this.user.addFavorite(this.allRecipes.find(recipe => recipe.id == id));
        } else {
            this.user.removeFavorite(id);
        }
    }

    // Casper - Shows menu when '+' is clicked
    showMenu(id) {
        const modal = this.domElement.querySelector(".click-menu-wrapper");
        const menu = this.domElement.querySelector(".click-menu");
        menu.innerHTML = /*html*/`
            <div onclick="addToFoodPlan(${id}); hideMenu()">
                <span class="material-icons">edit_calendar</span>Tilføj til madplan
            </div>
            <div onclick="addRecipeToShoppingList(${id}); hideMenu()">
                <span class="material-icons">format_list_bulleted</span>Tilføj til indkøbsliste
            </div>
        `;
        modal.style.display = "flex";
    }

    // Casper - Hides menu
    hideMenu() {
        this.domElement.querySelector(".click-menu-wrapper").style.display = "none";
    }
    
    // Natascha - Search recipes on recipe page, appends results
    search(searchValue) {
        searchValue = searchValue.toLowerCase();
        let results = [];
        for (const recipe of this.shownRecipes) {
            let title = recipe.title.toLowerCase();
            let description = recipe.description.toLowerCase();
            let country = recipe.country.toLowerCase();
            let theme = recipe.theme.toLowerCase();

            if (title.includes(searchValue) || description.includes(searchValue)
                                            || country.includes(searchValue)
                                            || theme.includes(searchValue)) {
                results.push(recipe);
            }
        }
        this.appendRecipes(results);
    }

    // Natascha - Search recipes on favorite page, appens results
    searchFavorites(searchValue) {
        searchValue = searchValue.toLowerCase();

        let results = [];
        let results2 = []

        // Favorites
        for (const recipe of this.user.favorites) {
            let title = recipe.title.toLowerCase();
            let description = recipe.description.toLowerCase();
            let country = recipe.country.toLowerCase();
            let theme = recipe.theme.toLowerCase();

            if (title.includes(searchValue) || description.includes(searchValue)
                                            || country.includes(searchValue)
                                            || theme.includes(searchValue)) {
                results.push(recipe);
            }
        }

        // Own recipes
        for (const recipe of this.user.myRecipes) {
            let title = recipe.title.toLowerCase();
            let description = recipe.description.toLowerCase();

            if (title.includes(searchValue) || description.includes(searchValue)) {
                results2.push(recipe);
            }
        }
        // Append
        this.appendFavorites(results, results2);
    }
 
    // Natascha - Updates info on recipe details page
    details(id) {
        const recipes = this.allRecipes.concat(this.user.myRecipes);
        const recipeToShow = recipes.find(recipe => recipe.id == id);
        const container = this.domElement.querySelector("#recipe-detail-container");
        container.innerHTML = recipeToShow.getDetailHTML();
        if (this.user.myRecipes.find(recipe => recipe.id == recipeToShow.id)) {
            container.classList.add("hide-details");
        } else {
            container.classList.remove("hide-details");
        }
        this.multiplyIngredients(id, 1);
    }

    // Casper - Multiplies amount of ingredients when dropdown is used
    multiplyIngredients(id, amount) {
        let array = this.allRecipes.concat(this.user.myRecipes);
        const recipeToShow = array.find(recipe => recipe.id == id);
        this.domElement.querySelector("#ingredients-table").innerHTML = recipeToShow.returnIngredientsHTML(amount);
    }

    // Natascha - Adds an ingredient to new recipe
    addIngredient() {
        // Input
        const inputAmount = this.domElement.querySelector("#input-amount");
        const inputUnit = this.domElement.querySelector("#input-unit");
        const inputIngredient = this.domElement.querySelector("#input-ingredients");

        // Update array
        let newIngredient = {
            amount: inputAmount.value,
            unit: inputUnit.value,
            name: inputIngredient.value
        }
        ingredients.push(newIngredient);

        // Reset input fields
        inputAmount.value = "";
        inputUnit.value = "";
        inputIngredient.value = "";

        // Append ingredient
        const table = this.domElement.querySelector("#ingredients-input");
        let html = "";
        for (const ingredient of ingredients) {                        
            html += `
                <tr>
                    <td>${ingredient.amount} ${ingredient.unit}</td>
                    <td>${ingredient.name}</td>
                </tr>
            `;
        }      
        table.innerHTML = html;
    }

    // Natascha - Adds a procedure to new recipe
    addProcedure() {
        // Input
        const inputProcedure = this.domElement.querySelector("#input-procedure");

        // Update array
        procedures.push(inputProcedure.value);

        // Reset input
        inputProcedure.value = "";

        // Append procedure
        const list = this.domElement.querySelector("#procedure-input");
        let html = "";
        for (const procedure of procedures) {                        
            html += `
                <li>${procedure}</li>
            `;
        }       
        list.innerHTML = html;
    }

    // Natascha - Saves the new recipe to current user, resets arrays
    saveRecipe() {
        this.user.addRecipe(ingredients, procedures)
        this.appendFavorites(this.user.favorites, this.user.myRecipes);
        ingredients = [];
        procedures = [];
    }

    // Casper - Creates a new food plan and adds it to current user, reset input
    createFoodPlan() {
        const nameContainer = this.domElement.querySelector("#foodplan-name");
        let title = nameContainer.value != "" ? nameContainer.value : "Unavngiven madplan";
        this.user.addFoodPlan(new FoodPlan(title));
        nameContainer.value = "";
    }

    // Natascha - Updates info on food plan details page
    foodPlanDetails(id) {
        const foodPlanToShow = this.user.foodPlans.find(foodPlan => foodPlan.id == id);
        this.domElement.querySelector("#food-plan-title").innerHTML = foodPlanToShow.title;
        this.domElement.querySelector("#remove-food-plan").setAttribute("onclick", `javascript: removeFoodPlan(${id})`);
        this.domElement.querySelector("#food-plan-details").innerHTML = foodPlanToShow.getDetailHTML();
    }

    // Casper - Updates food plans on pick food plan page
    addToFoodPlan(id) {
        const container = this.domElement.querySelector("#pick-food-plan-container");
        container.innerHTML = "";
        for (const foodPlan of this.user.foodPlans) {
            container.innerHTML = foodPlan.getPickHtml(id) + container.innerHTML;
        }
    }

    // Casper - Updates days on pick day page
    chooseFoodPlan(foodPlanId, recipeId) {
        let foodPlan = this.user.foodPlans.find(foodPlan => foodPlan.id == foodPlanId);
        let container = this.domElement.querySelector("#pick-day-container");
        let html = "";
        let i = 0;
        let day = "Mandag";

        for (const recipe of foodPlan.days) {
            switch(i) {
                case 0:
                    day = "Mandag";
                    break;
                case 1:
                    day = "Tirsdag";
                    break;
                case 2:
                    day = "Onsdag";
                    break;
                case 3:
                    day = "Torsdag";
                    break;
                case 4:
                    day = "Fredag";
                    break;
                case 5:
                    day = "Lørdag";
                    break;
                case 6:
                    day = "Søndag";
                    break;
                default:
                    day = "Mandag";
                    break;
            }

            let img = recipe.img != null ? recipe.img: "./img/" + day.toString().toLowerCase() + ".png";

            if (recipe.id != undefined) {
                html += /*html*/`
                    <article class="food-plan">
                        <div class="image-wrapper">
                            <img src="${recipe.img}">
                        </div>
                        <div class="text-wrapper">
                            <div>
                                <h2>${day}</h2>
                                <h3>${recipe.title}</h3>
                            </div>
                            <button type="button" onclick="chooseDay(${i}, ${foodPlanId}, ${recipeId})">Erstat opskrift</button>
                        </div>
                    </article>
                `;
            } else {
                html += /*html*/`
                    <article class="food-plan">
                        <div class="image-wrapper">
                            <img src="${img}">
                        </div>
                        <div class="text-wrapper">
                            <div>
                                <h2>${day}</h2>
                                <h3>Ingen opskrift</h3>
                            </div>
                            <button type="button" onclick="chooseDay(${i}, ${foodPlanId}, ${recipeId})">Tilføj opskrift</button>
                        </div>
                    </article>
                `;
            }
            i++;
        }
        container.innerHTML = html;
    }

    // Casper - When day is chosen, add recipe to chosen food plan on given day, save user
    chooseDay(dayIndex, foodPlanId, recipeId) {
        const foodPlan = this.user.foodPlans.find(foodPlan => foodPlan.id == foodPlanId);
        const recipe = this.allRecipes.concat(this.user.myRecipes).find(recipe => recipe.id == recipeId);
        foodPlan.addRecipeToDay(dayIndex, recipe);
        this.user.saveUser();
    }

    // Casper - Removes recipe from given day, save user
    removeRecipeFromDay(foodPlanId, dayIndex) {
        const foodPlan = this.user.foodPlans.find(foodPlan => foodPlan.id == foodPlanId);
        foodPlan.removeRecipeFromDay(dayIndex);
        this.user.saveUser();
    }

    // Casper - Updates create new shopping list page with ingredients from chosen recipe
    addRecipeToShoppingList(recipeId) {
        const recipeToAdd = this.allRecipes.concat(this.user.myRecipes).find(recipe => recipe.id == recipeId);
        this.domElement.querySelector("#shoppinglist-name").value = recipeToAdd.title;
        shoppingListIngredients = [];

        for (const ingredient of recipeToAdd.ingredients) {
            let newIngredient = {
                id: Date.now() + Math.random(),
                name: ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1),
                amount: ingredient.amount + " " + ingredient.unit,
                status: false
            }
            shoppingListIngredients.push(newIngredient);
        }
        this.appendIngredientsToList();
    }

    // Casper - Creates new shopping list, reset input
    createShoppingList() {
        const inputTitle = this.domElement.querySelector("#shoppinglist-name");
        let title = inputTitle.value != "" ? inputTitle.value : "Unavngiven indkøbsliste";
        this.user.addShoppingList(new ShoppingList(title, shoppingListIngredients));
        this.user.saveUser();

        shoppingListIngredients = [];
        inputTitle.value = "";
        this.domElement.querySelector("#ingredient-list").innerHTML = "";
    }

    // Casper - Add a new ingredient to temporary array, update dom
    addIngredientToShoppingList() {
        const ingredientName = this.domElement.querySelector("#ingredient-name");
        const ingredientAmount = this.domElement.querySelector("#ingredient-amount");

        if (ingredientName.value) {
            let newIngredient = {
                id: Date.now(),
                name: ingredientName.value,
                amount: ingredientAmount.value,
                status: false
            }
        
            shoppingListIngredients.push(newIngredient);

            this.appendIngredientsToList();
        
            ingredientName.value = "";
            ingredientAmount.value = "";
        }
    }

    // Casper - Updates DOM with current ingredient list
    appendIngredientsToList() {
        // Append 
        const container = this.domElement.querySelector("#ingredient-list");
        let html = "";
    
        for (const ingredient of shoppingListIngredients) {   
            const removeBox = /*html*/`<div onclick="removeIngredientFromList(${ingredient.id})" class="remove-box"><span class="material-icons">close</span></div>`                  
            html += `
                <div class="ingredient-item-wrapper">
                <div class="shopping-list-item"><p>${ingredient.name}</p><p>${ingredient.amount}</p></div>
                ${removeBox}
                </div>
            `;
        }
        container.innerHTML = html;
    }

    // Casper - Removes an ingredient from temporary array, update DOM
    removeIngredientFromList(ingredientId) {
        shoppingListIngredients = shoppingListIngredients.filter(ingredient => ingredient.id != ingredientId);
        this.appendIngredientsToList();
    }

    // Casper - Updates shopping list details page
    shoppingListDetails(id) {
        const shoppingListToShow = this.user.shoppingLists.find(shoppingList => shoppingList.id == id);
        this.domElement.querySelector("#shopping-list-title").innerHTML = shoppingListToShow.title;
        this.domElement.querySelector("#remove-shopping-list").setAttribute("onclick", `javascript: removeShoppingList(${id})`);
        this.domElement.querySelector("#shopping-list-details").innerHTML = shoppingListToShow.getDetailHtml();
    }

    // Natascha - Changes state to 'in basket', update dom
    checkIngredient(id, ingredientId) {
        const shoppingListToEdit = this.user.shoppingLists.find(shoppingList => shoppingList.id == id);
        shoppingListToEdit.checkIngredient(ingredientId);
        this.user.saveUser();
        this.domElement.querySelector("#shopping-list-details").innerHTML = shoppingListToEdit.getDetailHtml();
    }

    // Natascha - Changes state to 'not in basket', update dom
    uncheckIngredient(id, ingredientId) {
            const shoppingListToEdit = this.user.shoppingLists.find(shoppingList => shoppingList.id == id);
            shoppingListToEdit.uncheckIngredient(ingredientId);
            this.user.saveUser();
            this.domElement.querySelector("#shopping-list-details").innerHTML = shoppingListToEdit.getDetailHtml();
    }

}


