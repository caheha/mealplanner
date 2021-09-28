import Recipe from "./recipe.js";
import FoodPlan from "./foodPlan.js";

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

    removeFavorite(recipeToRemove) {
        this.favorites = this.favorites.filter(recipe => recipe.id != recipeToRemove.id);
        this.saveUser();
    }

    addRecipe() {
        let nameInput = document.getElementById("name").value;
        let imgInput = document.getElementById("img").value;
        let decriptionInput = document.getElementById("decription").value;
        let amountInput = document.getElementById("amount").value;
        let unitInput = document.getElementById("unit").value;
        let ingredientsInput = document.getElementById("ingredients").value;
        let procedureInput = document.getElementById("procedure").value;

        if (nameInput && imgInput && decriptionInput && amountInput && unitInput && ingredientsInput && procedureInput){
        let newRecipe = {
            name: nameInput,
            avatarUrl: imgInput,
            decription: decriptionInput,
            amount: amountInput,
            unit: unitInput,
            ingredients: ingredientsInput,
            procedure: procedureInput
            }
            
        this.myRecipes.push(newRecipe);
        appendPersons(this.myRecipes);  
        navigateTo("#/favoritter");   
    }
    


        

    }

    addFoodPlan(foodPlanToAdd) {
        this.foodPlans.push(foodPlanToAdd);
        this.saveUser();
    }

    removeFoodPlan(id) {
        this.foodPlans = this.foodPlans.filter(foodPlan => foodPlan.id != id);
        this.saveUser();
    }
}