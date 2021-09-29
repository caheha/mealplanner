import Recipe from "./recipe.js";
import FoodPlan from "./foodPlan.js";
import ShoppingList from "./shoppingList.js";

export default class User {
    constructor() {
        this.favorites = [];
        this.myRecipes = [];
        this.foodPlans = [];
        this.shoppingLists = [];
        this.init();
    }

    init() {
        if (!localStorage.getItem("user")) {
            localStorage.setItem("user", JSON.stringify(this));
        } else {
            let user = JSON.parse(localStorage.getItem("user"));
            for (const recipe of user.favorites) {
                Object.setPrototypeOf(recipe, Recipe.prototype);
            }
            for (const recipe of user.myRecipes) {
                Object.setPrototypeOf(recipe, Recipe.prototype);
            }
            for (const foodPlan of user.foodPlans) {
                Object.setPrototypeOf(foodPlan, FoodPlan.prototype)
            }
            for (const shoppingList of user.shoppingLists) {
                Object.setPrototypeOf(shoppingList, ShoppingList.prototype)
            }
            this.favorites = user.favorites; 
            this.myRecipes = user.myRecipes;
            this.foodPlans = user.foodPlans;
            this.shoppingLists = user.shoppingLists;
        }
    }

    saveUser() {
        localStorage.setItem("user", JSON.stringify(this));
    }

    addFavorite(recipeToAdd) {
        this.favorites.push(recipeToAdd);
        this.saveUser();
    }

    removeFavorite(recipeIdToRemove) {
        this.favorites = this.favorites.filter(recipe => recipe.id != recipeIdToRemove);
        this.saveUser();
    }

    addRecipe(ingredients, procedure) {
        let nameInput = document.getElementById("input-name").value;
        let imgInput = document.getElementById("input-img").value;
        let descriptionInput = document.getElementById("input-description").value;

        if (nameInput && imgInput && descriptionInput && ingredients.length > 0) {
            let newRecipe = new Recipe(nameInput, descriptionInput, imgInput, 0, 0, 0, null, null, null, null, null, null, null, null, null, ingredients, procedure);
            
            this.myRecipes.push(newRecipe);
        }

        document.getElementById("input-name").value = "";
        document.getElementById("input-img").value = "";
        document.getElementById("input-description").value = "";
        this.saveUser();
    }

    addFoodPlan(foodPlanToAdd) {
        this.foodPlans.push(foodPlanToAdd);
        this.saveUser();
    }

    removeFoodPlan(id) {
        this.foodPlans = this.foodPlans.filter(foodPlan => foodPlan.id != id);
        this.saveUser();
    }

    addShoppingList(shoppingListToAdd) {
        this.shoppingLists.push(shoppingListToAdd);
        this.saveUser();
    }

    removeShoppinglist(id) {
        this.shoppingLists = this.shoppingLists.filter(shoppingList => shoppingList.id != id);
        this.saveUser();
    }
}