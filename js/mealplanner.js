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
        this.appendFavorites(this.user.favorites);
        this.appendFoodPlans();
    }

    // Henter JSON fra lokal fil og returnerer den
    async fetchRecipes() {
        let response = await fetch(this.baseUrl);
        let data = await response.json();
        console.log(data);
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

    appendFavorites(recipes) {
        let container = this.domElement.querySelector("#favorites-container");

        let html = "<h2>Favoritter</h2>";

        for (const recipe of recipes) {                        
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

    appendFoodPlans() {
        let container = this.domElement.querySelector("#foodplans-container");

        let html = "";

        for (const foodPlan of this.user.foodPlans) {
            html = foodPlan.getHtml() + html;
        }

        container.innerHTML = html;
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

    searchFavorites(searchValue) {
        searchValue = searchValue.toLowerCase();

        let results = [];

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
            this.appendFavorites(results);
        }
    }
 
    details(id) {
        const recipeToShow = this.allRecipes.find(recipe => recipe.id == id);
        document.querySelector("#recipe-detail-container").innerHTML = recipeToShow.getDetailHTML();
        this.multiplyIngredients(id, 1);
    }

    foodPlanDetails(id) {
        const foodPlanToShow = this.user.foodPlans.find(foodPlan => foodPlan.id == id);
        document.querySelector("#food-plan-title").innerHTML = foodPlanToShow.title;
        document.querySelector("#food-plan-details").innerHTML = foodPlanToShow.getDetailHTML();
    }
    
    multiplyIngredients(id, amount) {
        const recipeToShow = this.allRecipes.find(recipe => recipe.id == id);
        document.querySelector("#ingredients-table").innerHTML = recipeToShow.returnIngredientsHTML(amount);
    }

}


