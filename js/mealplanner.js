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
        this.appendFavorites(this.user.favorites, this.user.myRecipes);
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

        console.log(ownRecipes.length);

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

    /*to do properly*/
    showMenu(id, type) {
        let container = this.domElement.querySelector(".click-menu");
        let currentBox = this.domElement.querySelector(`#add-${id}`);
        let x = currentBox.getBoundingClientRect().left;
        let y = currentBox.getBoundingClientRect().top;
        console.log(x.toString(), y);
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
        let array = this.allRecipes.concat(this.user.myRecipes);
        const recipeToShow = array.find(recipe => recipe.id == id);
        document.querySelector("#recipe-detail-container").innerHTML = recipeToShow.getDetailHTML();
        this.multiplyIngredients(id, 1);
    }

    foodPlanDetails(id) {
        const foodPlanToShow = this.user.foodPlans.find(foodPlan => foodPlan.id == id);
        document.querySelector("#food-plan-title").innerHTML = foodPlanToShow.title;
        document.querySelector("#remove-food-plan").setAttribute("onclick", `javascript: removeFoodPlan(${id})`);
        document.querySelector("#food-plan-details").innerHTML = foodPlanToShow.getDetailHTML();
    }
    
    multiplyIngredients(id, amount) {
        let array = this.allRecipes.concat(this.user.myRecipes);
        const recipeToShow = array.find(recipe => recipe.id == id);
        document.querySelector("#ingredients-table").innerHTML = recipeToShow.returnIngredientsHTML(amount);
    }

}


