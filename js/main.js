import MealPlanner from "./mealplanner.js";
import Router from "./router.js";

const app = document.querySelector("#app");

const router = new Router(app, "#/");

const mealplanner = new MealPlanner(app);

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