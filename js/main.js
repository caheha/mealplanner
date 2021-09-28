import MealPlanner from "./mealplanner.js";
import Router from "./router.js";
import User from "./user.js";
import FoodPlan from "./foodPlan.js";

let ingredients = [];
let procedure = [];
let newRecipe = [];

const app = document.querySelector("#app");

const router = new Router(app, "#/");

const user = new User();

const mealplanner = new MealPlanner(app, user);

window.favorite = (id) => {
    if (!user.favorites.find(recipe => recipe.id == id)) {
        user.addFavorite(mealplanner.allRecipes.find(recipe => recipe.id == id));
    } else {
        user.removeFavorite(user.favorites.find(recipe => recipe.id == id));
    }
    mealplanner.appendFavorites(user.favorites);
}

/*todo properly*/
window.showMenu = (id, type) => {
    mealplanner.showMenu(id, type);
}
/*todo properly*/
window.hideMenu = () => {
    mealplanner.hideMenu();
}

//mealplanner.appendFavorites();

window.search = (searchValue) => {
    mealplanner.search(searchValue);
    mealplanner.appendFavorites(user.favorites);
}

window.searchFavorites = (searchValue) => {
    mealplanner.searchFavorites(searchValue);
}

window.goToDetails = (id) => {
    mealplanner.details(id);
    router.navigateTo("#/opskriftsdetaljer");
    mealplanner.appendFavorites(user.favorites);
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

window.addIngredient = () => {
    let amount
    let unit
    let ingredient = document.querySelector

    
}

window.addProcedure = () => {
    let procedure = document.querySelector

}

window.saveRecipe = () => {
    ingredients = [];
    procedure = [];
    newRecipe = [];
}

window.createFoodPlan = () => {
    let nameContainer = document.querySelector("#foodplan-name");
    user.addFoodPlan(new FoodPlan(nameContainer.value));
    nameContainer.value = "";

    mealplanner.appendFoodPlans();
    router.navigateTo("#/madplan");
}

window.removeFoodPlan = (id) => {
    user.removeFoodPlan(id);
    mealplanner.appendFoodPlans();
    router.navigateTo("#/madplan");
    console.log("test");
}

window.goToFoodPlanDetails = (id) => {
    mealplanner.foodPlanDetails(id);
    router.navigateTo("#/madplandetaljer");
}

window.addToFoodPlan = (id) => {
    let container = document.querySelector("#pick-food-plan-container");
    container.innerHTML = "";
    for (const foodPlan of user.foodPlans) {
        container.innerHTML = foodPlan.getPickHtml(id) + container.innerHTML;
    }
    router.navigateTo("#/vælgmadplan");
}

window.chooseFoodPlan = (foodPlanId, recipeId) => {
    let foodPlan = user.foodPlans.find(foodPlan => foodPlan.id == foodPlanId);
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
                        <img src="./img/gluten.png">
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
    router.navigateTo("#/vælgdag");
}

window.chooseDay = (dayIndex, foodPlanId, recipeId) => {
    let foodPlan = user.foodPlans.find(foodPlan => foodPlan.id == foodPlanId);
    let recipe = mealplanner.allRecipes.find(recipe => recipe.id == recipeId);
    console.log(foodPlan);
    console.log(recipe);
    foodPlan.addRecipeToDay(dayIndex, recipe);
    user.saveUser();
    //update images
    mealplanner.appendFoodPlans();
    router.navigateTo("#/opskrifter");
}

/*todo properly*/
window.removeRecipeFromDay = (foodPlanId, dayIndex) => {
    let foodPlan = user.foodPlans.find(foodPlan => foodPlan.id == foodPlanId);
    foodPlan.removeRecipeFromDay(dayIndex);
    mealplanner.appendFoodPlans();
    user.saveUser();
}

/*
let recipe = {
    id: "",
    title: "Spaghetti Carbonara",
    description: "Et klassisk pastaret fra Italien.",
    img: "",
    rating: 4,
    time: 20,
    price: "Middel",

    country: "italien",
    
    gluten: true,
    vegetarian: true,
    vegan: false,
    sugar: true,
    dairy: true,

    season: "",
    theme: "",
    holiday: "",


    ingredients: [],
    procedure: ["Sæt vandet i kog", "Hæld pasta i gryden"],

}

let user = {
    favorites: ["id1", "id2", "id3", "id4"],
    ownRecipes: [],
    foodPlans: [ {monday: "recipeId", tuesday: "recipeId2"}, {monday}],
    shoppingLists: [ {title: "Indkøbslsite mandag", ingredients: [ {name: "kartofler", amount: 2, unit: "kg"} ] } ]
}*/
/*
if (user) {
    skip onboarding
}
*/