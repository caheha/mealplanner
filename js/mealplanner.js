import Recipe from './recipe.js';

export default class MealPlanner {
    constructor(domElement) {
        this.domElement = domElement;
        this.baseUrl = "./json/recipes.json";
        this.recipes = [];
        this.currentUser = {};
        this.init();
    }

    async init() {
        await this.fetchRecipes();

        this.appendRecipes();
    }

    // Henter JSON fra lokal fil og returnerer den
    async fetchRecipes() {
        let response = await fetch(this.baseUrl);
        let data = await response.json();
        console.log(data);
        for (const recipe of data) {
            this.recipes.push(new Recipe(recipe.title, recipe.description, recipe.img, recipe.rating, 
                                         recipe.time, recipe.price, recipe.country, recipe.gluten, recipe.vegetarian, 
                                         recipe.vegan, recipe.sugar, recipe.dairy, recipe.season, 
                                         recipe.theme, recipe.holiday, recipe.ingredients, recipe.procedure))
        }
        return this.recipes;
    }

    appendRecipes() {
        let container = this.domElement.querySelector("#recipes-container");

        let html = "";

        for (const recipe of this.recipes) {                        
            html += recipe.getHtml();
        }
                
        container.innerHTML = html;
    }
}