import Recipe from './recipe.js';
import FoodPlan from './foodPlan.js';
import ShoppingList from './shoppingList.js';

let ingredients = [];
let procedures = [];
let shoppingListIngredients = [];

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

    async init() {
        await this.fetchRecipes();
        this.shownRecipes = this.allRecipes;

        this.appendRecipes(this.allRecipes);
        this.appendFavorites(this.user.favorites, this.user.myRecipes);
        this.appendFoodPlans();
        this.appendShoppingLists();
    }

    // Henter JSON fra lokal fil og returnerer den
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
        
    appendRecipes(recipes) {
        let container = this.domElement.querySelector("#recipes-container");

        let html = "";

        for (const recipe of recipes) {                        
            html += recipe.getHtml();
        }
                
        container.innerHTML = html;
    }

    appendFavorites(favorites, ownRecipes) {
        let favoritesContainer = this.domElement.querySelector("#favorites-container");

        let html = "<h2>Favoritter</h2>";

        if (favorites.length == 0) {
            html += "<p class='small-text'>Du har ingen favoritter der matchede din søgning, eller så har du ikke tilføjet nogle endnu.</p>";
        } else {
            for (const recipe of favorites) {                        
                html += recipe.getHtml();
            }
        }

        favoritesContainer.innerHTML = html;

        let ownRecipesContainer = this.domElement.querySelector("#own-recipes-container");

        let ownRecipesHtml = "<h2>Mine opskrifter</h2>";

        if (ownRecipes.length == 0) {
            ownRecipesHtml += "<p class='small-text'>Du har ingen opskrifter der matchede din søgning, eller så har du ikke tilføjet nogle endnu.</p>";
        } else {
            for (const recipe of ownRecipes) {                        
                ownRecipesHtml += recipe.getHtml();
            }
        }
        ownRecipesContainer.innerHTML = ownRecipesHtml;
        
        // Make favorite icon green if favorited
        this.updateFavoriteIcons();
    }

    updateFavoriteIcons() {
        let favoriteIcons = this.domElement.querySelectorAll(".favorite");

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

    appendFoodPlans() {
        let container = this.domElement.querySelector("#foodplans-container");

        let html = "";

        for (const foodPlan of this.user.foodPlans) {
            html = foodPlan.getHtml() + html;
        }

        if (this.user.foodPlans.length == 0) {
            html = "<p class='small-text'>Du har ikke oprettet nogle madplaner endnu, du kan oprette en ved at trykke på '+' i øverste højre hjørne.";
        }

        container.innerHTML = html;
    }

    
    appendShoppingLists() {
        let container = this.domElement.querySelector("#shoppinglists-container");

        let html = "";

        for (const shoppingList of this.user.shoppingLists) {                        
            html += shoppingList.getHtml();
        }
                
        container.innerHTML = html;
    }

    favorite(id) {
        if (!this.user.favorites.find(recipe => recipe.id == id)) {
            this.user.addFavorite(this.allRecipes.find(recipe => recipe.id == id));
        } else {
            this.user.removeFavorite(id);
        }
    }

    /*to do properly*/
    showMenu(id, type) {
        let container = this.domElement.querySelector(".click-menu");
        let currentBox = this.domElement.querySelector(`#add-${id}`);
        let x = currentBox.getBoundingClientRect().left;
        let y = currentBox.getBoundingClientRect().top;
        container.innerHTML = /*html*/`
            <div onclick="addToFoodPlan(${id}); hideMenu()">
                <span class="material-icons">edit_calendar</span>Tilføj til madplan
            </div>
            <div>
                <span class="material-icons">format_list_bulleted</span>Tilføj til indkøbsliste
            </div>
        `;
        container.style.display = "block";
        if (type == 1) {
            container.style.left = `calc(${x}px - 180px)`;
            container.style.top = `calc(${y}px + ${window.pageYOffset}px - 10px)`;
        } else {
            container.style.left = `calc(${x}px + 165px)`;
            container.style.top = `calc(${y}px + ${window.pageYOffset}px + 100px)`;
        }
    }

    /*to do properly*/
    hideMenu() {
        let container = this.domElement.querySelector(".click-menu");
        container.style.display = "none";
    }

/* Search functionality */
    
    search(searchValue) {
        searchValue = searchValue.toLowerCase();

        let results = [];

        for (const recipe of this.shownRecipes) {
            let title = recipe.title.toLowerCase();
            let description = recipe.description.toLowerCase();
            let country = recipe.country.toLowerCase();
            let theme = recipe.theme.toLowerCase();
            let holiday = recipe.holiday ? recipe.holiday.toLowerCase : "";
            //let price = recipe.price.toLowerCase();
            //let time = recipe.time.toLowerCase();
            //let ingredients = recipe.ingredients.toLowerCase();

            if (title.includes(searchValue)
                || description.includes(searchValue)
                || country.includes(searchValue
                || theme.includes(searchValue)
                || holiday.includes(searchValue))
                /*|| ingredients.includes(searchValue)*/) {
                results.push(recipe);
            }
        }
        this.appendRecipes(results);
    }

    searchFavorites(searchValue) {
        searchValue = searchValue.toLowerCase();

        let results = [];
        let results2 = []

        for (const recipe of this.user.favorites) {
            let title = recipe.title.toLowerCase();
            let description = recipe.description.toLowerCase();
            let country = recipe.country.toLowerCase();
            let theme = recipe.theme.toLowerCase();
            let holiday = recipe.holiday ? recipe.holiday.toLowerCase : "";
            //let price = recipe.price.toLowerCase();
            //let time = recipe.time.toLowerCase();
            //let ingredients = recipe.ingredients.toLowerCase();

            if (title.includes(searchValue)
                || description.includes(searchValue)
                || country.includes(searchValue
                || theme.includes(searchValue)
                || holiday.includes(searchValue))
                /*|| ingredients.includes(searchValue)*/) {
                results.push(recipe);
            }
        }

        for (const recipe of this.user.myRecipes) {
            let title = recipe.title.toLowerCase();
            let description = recipe.description.toLowerCase();
            //let price = recipe.price.toLowerCase();
            //let time = recipe.time.toLowerCase();
            //let ingredients = recipe.ingredients.toLowerCase();

            if (title.includes(searchValue)
                || description.includes(searchValue))
                /*|| ingredients.includes(searchValue)*/ {
                results2.push(recipe);
            }
        }
        this.appendFavorites(results, results2);
    }
 
    details(id) {
        const recipes = this.allRecipes.concat(this.user.myRecipes);
        const recipeToShow = recipes.find(recipe => recipe.id == id);
        const container = document.querySelector("#recipe-detail-container");
        container.innerHTML = recipeToShow.getDetailHTML();
        if (this.user.myRecipes.find(recipe => recipe.id == recipeToShow.id)) {
            container.classList.add("hide-details");
        } else {
            container.classList.remove("hide-details");
        }
        this.multiplyIngredients(id, 1);
    }

    multiplyIngredients(id, amount) {
        let array = this.allRecipes.concat(this.user.myRecipes);
        const recipeToShow = array.find(recipe => recipe.id == id);
        document.querySelector("#ingredients-table").innerHTML = recipeToShow.returnIngredientsHTML(amount);
    }

    addIngredient() {
        let inputAmount = document.querySelector("#input-amount");
        let inputUnit = document.querySelector("#input-unit");
        let inputIngredient = document.querySelector("#input-ingredients");

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
        let table = document.querySelector("#ingredients-input");

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

    addProcedure() {
        // Get input
        let inputProcedure = document.querySelector("#input-procedure");

        // Update array
        procedures.push(inputProcedure.value);

        // Reset input
        inputProcedure.value = "";

        // Append procedure
        let liste = document.querySelector("#procedure-input");

        let html = "";

        for (const procedure of procedures) {                        
            html += `
                <li>${procedure}</li>
            `;
        }
                
        liste.innerHTML = html;
    }

    saveRecipe() {
        this.user.addRecipe(ingredients, procedures)
        this.appendFavorites(this.user.favorites, this.user.myRecipes);
        ingredients = [];
        procedures = [];
    }

    createFoodPlan() {
        const nameContainer = document.querySelector("#foodplan-name");
        this.user.addFoodPlan(new FoodPlan(nameContainer.value));
        nameContainer.value = "";
    }

    foodPlanDetails(id) {
        const foodPlanToShow = this.user.foodPlans.find(foodPlan => foodPlan.id == id);
        document.querySelector("#food-plan-title").innerHTML = foodPlanToShow.title;
        document.querySelector("#remove-food-plan").setAttribute("onclick", `javascript: removeFoodPlan(${id})`);
        document.querySelector("#food-plan-details").innerHTML = foodPlanToShow.getDetailHTML();
    }

    addToFoodPlan(id) {
        let container = document.querySelector("#pick-food-plan-container");
        container.innerHTML = "";
        for (const foodPlan of this.user.foodPlans) {
            container.innerHTML = foodPlan.getPickHtml(id) + container.innerHTML;
        }
    }

    chooseFoodPlan(foodPlanId, recipeId) {
        let foodPlan = this.user.foodPlans.find(foodPlan => foodPlan.id == foodPlanId);
        let container = document.querySelector("#pick-day-container");
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

    chooseDay(dayIndex, foodPlanId, recipeId) {
        let foodPlan = this.user.foodPlans.find(foodPlan => foodPlan.id == foodPlanId);
        let recipe = this.allRecipes.concat(this.user.myRecipes).find(recipe => recipe.id == recipeId);
        foodPlan.addRecipeToDay(dayIndex, recipe);
        this.user.saveUser();
    }

    removeRecipeFromDay(foodPlanId, dayIndex) {
        let foodPlan = this.user.foodPlans.find(foodPlan => foodPlan.id == foodPlanId);
        foodPlan.removeRecipeFromDay(dayIndex);
        this.user.saveUser();
    }

    createShoppingList() {
        let inputTitle = document.querySelector("#shoppinglist-name");
        this.user.addShoppingList(new ShoppingList(inputTitle.value, shoppingListIngredients));
        this.user.saveUser();
        shoppingListIngredients = [];
        inputTitle.value = ""
        document.querySelector("#ingredient-list").innerHTML = "";
    }

    addIngredientToShoppingList() {
        let ingredientName = document.querySelector("#ingredient-name");
        let ingredientAmount = document.querySelector("#ingredient-amount");

        if (ingredientName.value) {
            let newIngredient = {
                id: Date.now(),
                name: ingredientName.value,
                amount: ingredientAmount.value,
                status: false
            }
        
            shoppingListIngredients.push(newIngredient);
        
            // Append 
            let container = document.querySelector("#ingredient-list");
            let html = "";
        
            for (const ingredient of shoppingListIngredients) {                        
                html += `
                    <div class="shopping-list-item"><p>${ingredient.name}</p><p>${ingredient.amount}</p></div>
                `;
            }
        
            ingredientName.value = "";
            ingredientAmount.value = "";
        
            container.innerHTML = html;
        }
    }

    shoppingListDetails(id) {
        const shoppingListToShow = this.user.shoppingLists.find(shoppingList => shoppingList.id == id);
        document.querySelector("#shopping-list-title").innerHTML = shoppingListToShow.title;
        document.querySelector("#remove-shopping-list").setAttribute("onclick", `javascript: removeShoppingList(${id})`);
        document.querySelector("#shopping-list-details").innerHTML = shoppingListToShow.getDetailHtml();
    }

    checkIngredient(id, ingredientId) {
        const shoppingListToEdit = this.user.shoppingLists.find(shoppingList => shoppingList.id == id);
        shoppingListToEdit.checkIngredient(ingredientId);
        this.user.saveUser();
        document.querySelector("#shopping-list-details").innerHTML = shoppingListToEdit.getDetailHtml();
    }

   uncheckIngredient(id, ingredientId) {
        const shoppingListToEdit = this.user.shoppingLists.find(shoppingList => shoppingList.id == id);
        shoppingListToEdit.uncheckIngredient(ingredientId);
        this.user.saveUser();
        document.querySelector("#shopping-list-details").innerHTML = shoppingListToEdit.getDetailHtml();
   }

}


