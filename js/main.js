import MealPlanner from "./mealplanner.js";
import Router from "./router.js";
import User from "./user.js";

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
    mealplanner.appendFavorites();
}

//mealplanner.appendFavorites();

window.search = (searchValue) => {
    mealplanner.search(searchValue);
}

window.goToDetails = (id) => {
    mealplanner.details(id);
    router.navigateTo("#/opskriftsdetaljer");
    mealplanner.appendFavorites();
}

// Todo
window.multiplyAmount = (scale) => {
    let amounts = document.querySelectorAll("#recipe-amount");
    
    for (const amount of amounts) {
        amount.innerHTML *= scale;
    }
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