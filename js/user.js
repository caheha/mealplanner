import Recipe from "./recipe.js";

export default class User {
    constructor() {
        this.favorites = [];
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
            this.favorites = user.favorites; 
            this.foodPlans = user.foodPlans;
            this.shoppingLists = user.shoppingLists;
        }
    }

    saveUser() {
        localStorage.setItem("user", JSON.stringify(this))
    }

    addFavorite(recipeToAdd) {
        this.favorites.push(recipeToAdd);
        this.saveUser();
    }

    removeFavorite(recipeToRemove) {
        this.favorites = this.favorites.filter(recipe => recipe.id != recipeToRemove.id);
        this.saveUser();
    }
}