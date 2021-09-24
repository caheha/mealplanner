import Recipe from './recipe.js';

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
        this.appendFavorites();
    }

    // Henter JSON fra lokal fil og returnerer den
    async fetchRecipes() {
        let response = await fetch(this.baseUrl);
        let data = await response.json();
        console.log(data);
        for (const recipe of data) {
            this.allRecipes.push(new Recipe(recipe.title, recipe.description, recipe.img, recipe.rating, 
                                         recipe.time, recipe.price, recipe.country, recipe.gluten, recipe.vegetarian, 
                                         recipe.vegan, recipe.sugar, recipe.dairy, recipe.season, 
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

    appendFavorites() {
        let container = this.domElement.querySelector("#favorites-container");

        let html = "";

        for (const recipe of this.user.favorites) {                        
            html += recipe.getHtml();
        }

        container.innerHTML = html;
        
        // Make favorite icon green if favorited
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

/* Search functionality */
    
    search(searchValue) {
    searchValue = searchValue.toLowerCase();

        let results = [];

        for (const recipe of this.shownRecipes) {
            let title = recipe.title.toLowerCase();
            let description = recipe.description.toLowerCase();
            let country = recipe.country.toLowerCase();
            //let ingredients = recipe.ingredients.toLowerCase();

            if (title.includes(searchValue)
                || description.includes(searchValue)
                || country.includes(searchValue)
                /*|| ingredients.includes(searchValue)*/) {
                results.push(recipe);
                }
            this.appendRecipes(results);
        }

    }
 
    details(id) {
        const recipeToShow = this.allRecipes.find(recipe => recipe.id == id);
        document.querySelector("#recipe-detail-container").innerHTML = recipeToShow.getDetailHTML();

    }


}


