import MealPlanner from "./mealplanner.js";
import Router from "./router.js";
import User from "./user.js";

const app = document.querySelector("#app");

const router = new Router(app, "#/");

const user = new User();

const mealplanner = new MealPlanner(app, user);

window.favorite = (id) => {
    mealplanner.favorite(id);
    // update dom
    mealplanner.appendFavorites(user.favorites, user.myRecipes);
}

/*todo properly*/
window.showMenu = (id, type) => {
    mealplanner.showMenu(id, type);
}
/*todo properly*/
window.hideMenu = () => {
    mealplanner.hideMenu();
}

// Called when search field for all recipes is used
window.search = (searchValue) => {
    mealplanner.search(searchValue);
    mealplanner.appendFavorites(user.favorites, user.myRecipes);
}

// Called when search field for favorite recipes is used
window.searchFavorites = (searchValue) => {
    mealplanner.searchFavorites(searchValue);
}

window.goToDetails = (id) => {
    mealplanner.details(id);
    router.navigateTo("#/opskriftsdetaljer");
    mealplanner.appendFavorites(user.favorites, user.myRecipes);
}

window.multiplyAmount = (id, scale) => {
    mealplanner.multiplyIngredients(id, scale);
}

window.goToSearch = () => {
    router.navigateTo("#/opskrifter");
}

window.goToFavorites = () => {
    router.navigateTo("#/favoritter");
}

window.goToFoodPlan = () => {
    router.navigateTo("#/madplan");
}

window.goToShoppingList = () => {
    router.navigateTo("#/indkøbsliste");
}

window.goToAddRecipe = () => {
    router.navigateTo("#/opretopskrift");
}

/* ------ Add ingredients, procedure & save recipe ------ */

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



/* ------  ------ */

window.createFoodPlan = () => {
    mealplanner.createFoodPlan();
    mealplanner.appendFoodPlans();
    router.navigateTo("#/madplan");
}

window.removeFoodPlan = (id) => {
    user.removeFoodPlan(id);
    mealplanner.appendFoodPlans();
    router.navigateTo("#/madplan");
}

window.goToFoodPlanDetails = (id) => {
    mealplanner.foodPlanDetails(id);
    router.navigateTo("#/madplandetaljer");
}

window.addToFoodPlan = (id) => {
    mealplanner.addToFoodPlan(id);
    router.navigateTo("#/vælgmadplan");
}

window.chooseFoodPlan = (foodPlanId, recipeId) => {
    mealplanner.chooseFoodPlan(foodPlanId, recipeId);
    router.navigateTo("#/vælgdag");
}

window.chooseDay = (dayIndex, foodPlanId, recipeId) => {
    mealplanner.chooseDay(dayIndex, foodPlanId, recipeId)
    //update dom
    mealplanner.appendFoodPlans();
    router.navigateTo("#/opskrifter");
}

window.removeRecipeFromDay = (foodPlanId, dayIndex) => {
    mealplanner.removeRecipeFromDay(foodPlanId, dayIndex);
    // update dom
    mealplanner.appendFoodPlans();
    goToFoodPlanDetails(foodPlanId);
}

window.addIngredientToShoppingList = () => {
    mealplanner.addIngredientToShoppingList();
}

window.createShoppinglist = () => {
    mealplanner.createShoppingList();
    // update dom
    mealplanner.appendShoppingLists();
    router.navigateTo("#/indkøbsliste");
}

window.shoppingListDetails = (id) => {
    mealplanner.shoppingListDetails(id);
    router.navigateTo("#/indkøbslistedetaljer");
}

window.checkIngredient = (id, ingredientId) => {
    mealplanner.checkIngredient(id, ingredientId);
}

window.uncheckIngredient = (id, ingredientId) => {
    mealplanner.uncheckIngredient(id, ingredientId);
}

window.removeShoppingList = (id) => {
    user.removeShoppinglist(id);
    mealplanner.appendShoppingLists();
    router.navigateTo("#/indkøbsliste");
}