// Import
import MealPlanner from "./mealplanner.js";
import Router from "./router.js";
import User from "./user.js";

// Create app, router, user and mealplanner
const app = document.querySelector("#app");
const router = new Router(app, "#/");
const user = new User();
const mealplanner = new MealPlanner(app, user);

// Natascha - Add/remove recipe from favorites, update dom
window.favorite = (id) => {
    mealplanner.favorite(id);
    mealplanner.appendFavorites(user.favorites, user.myRecipes);
}

// Casper - Shows menu when '+' is clicked
window.showMenu = (id, type) => {
    mealplanner.showMenu(id, type);
}

// Casper - Hides menu
window.hideMenu = () => {
    mealplanner.hideMenu();
}

// Natascha - Called when search field for all recipes is used
window.search = (searchValue) => {
    mealplanner.search(searchValue);
}

// Natascha - Called when search field for favorite recipes is used
window.searchFavorites = (searchValue) => {
    mealplanner.searchFavorites(searchValue);
}

// Natascha - Updates details page, changes to page
window.goToDetails = (id) => {
    mealplanner.details(id);
    mealplanner.updateFavoriteIcons();
    router.navigateTo("#/opskriftsdetaljer");
}

// Casper - Scales ingredients with dropdown
window.multiplyAmount = (id, scale) => {
    mealplanner.multiplyIngredients(id, scale);
}

// Natascha - Navigates to pages
window.goToSearch = () => router.navigateTo("#/opskrifter");
window.goToFavorites = () => router.navigateTo("#/favoritter");
window.goToFoodPlan = () => router.navigateTo("#/madplan");
window.goToShoppingList = () => router.navigateTo("#/indkøbsliste");
window.goToAddRecipe = () => router.navigateTo("#/opretopskrift");

// Natascha - New recipe - addIngredient, addProcedure, saveRecipe
window.addIngredient = () => {
    mealplanner.addIngredient();
}

window.addProcedure = () => {
    mealplanner.addProcedure();
}

window.saveRecipe = () => {
    mealplanner.saveRecipe();
    router.navigateTo("#/favoritter");   
}

// Casper - Adds new food plan, update DOM, go to food plans page
window.createFoodPlan = () => {
    mealplanner.createFoodPlan();
    mealplanner.appendFoodPlans();
    router.navigateTo("#/madplan");
}

// Casper - Removes food plan from current user, go to food plans page
window.removeFoodPlan = (id) => {
    user.removeFoodPlan(id);
    mealplanner.appendFoodPlans();
    router.navigateTo("#/madplan");
}

// Natascha - Go to food plan details page
window.goToFoodPlanDetails = (id) => {
    mealplanner.foodPlanDetails(id);
    router.navigateTo("#/madplandetaljer");
}

// Casper - Opens add recipe to food plan flow -> pick food plan
window.addToFoodPlan = (id) => {
    mealplanner.addToFoodPlan(id);
    router.navigateTo("#/vælgmadplan");
}

// Casper - Next step in flow -> pick day
window.chooseFoodPlan = (foodPlanId, recipeId) => {
    mealplanner.chooseFoodPlan(foodPlanId, recipeId);
    router.navigateTo("#/vælgdag");
}

// Casper - Day chosen, save food plan and update DOM
window.chooseDay = (dayIndex, foodPlanId, recipeId) => {
    mealplanner.chooseDay(dayIndex, foodPlanId, recipeId)
    mealplanner.appendFoodPlans();
    router.navigateTo("#/opskrifter");
}

// Casper - Removes recipe from food plan at given day, update DOM
window.removeRecipeFromDay = (foodPlanId, dayIndex) => {
    mealplanner.removeRecipeFromDay(foodPlanId, dayIndex);
    mealplanner.appendFoodPlans();
    goToFoodPlanDetails(foodPlanId);
}

// Casper - Update and navigate to create new shopping list page
window.addRecipeToShoppingList = (id) => {
    mealplanner.addRecipeToShoppingList(id);
    router.navigateTo("#/opretindkøbsliste");
}

// Casper - Adds an ingredient to shopping list
window.addIngredientToShoppingList = () => {
    mealplanner.addIngredientToShoppingList();
}

// Casper - Removes ingredient from shopping list
window.removeIngredientFromList= (id) => {
    mealplanner.removeIngredientFromList(id);
}

// Casper - Creates and saves shooping list to user
window.createShoppinglist = () => {
    mealplanner.createShoppingList();
    mealplanner.appendShoppingLists();
    router.navigateTo("#/indkøbsliste");
}

// Casper - Updates shopping list details page
window.shoppingListDetails = (id) => {
    mealplanner.shoppingListDetails(id);
    router.navigateTo("#/indkøbslistedetaljer");
}

// Natascha - Changes status of ingredient to true
window.checkIngredient = (id, ingredientId) => {
    mealplanner.checkIngredient(id, ingredientId);
}

// Natascha - Changes status of ingredient to false
window.uncheckIngredient = (id, ingredientId) => {
    mealplanner.uncheckIngredient(id, ingredientId);
}

// Casper - Removes shopping list, update DOM
window.removeShoppingList = (id) => {
    user.removeShoppinglist(id);
    mealplanner.appendShoppingLists();
    router.navigateTo("#/indkøbsliste");
}