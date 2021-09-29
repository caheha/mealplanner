import MealPlanner from "./mealplanner.js";
import Router from "./router.js";
import User from "./user.js";
import FoodPlan from "./foodPlan.js";
import Recipe from "./recipe.js";

let ingredients = [];
let procedures = [];

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
    mealplanner.appendFavorites(user.favorites, user.myRecipes);
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
    mealplanner.appendFavorites(user.favorites, user.myRecipes);
}

window.searchFavorites = (searchValue) => {
    mealplanner.searchFavorites(searchValue);
}

window.goToDetails = (id) => {
    mealplanner.details(id);
    router.navigateTo("#/opskriftsdetaljer");
    mealplanner.appendFavorites(user.favorites, user.myRecipes);
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

window.goToFoodPlan = () => {
    router.navigateTo("#/madplan");
}

window.goToShoppingList = () => {
    router.navigateTo("#/indkøbsliste");
}

window.goToAddRecipe = () => {
    router.navigateTo("#/opretopskrift");
}

/* ------ Add ingredients, procedure & save recipe ------ */

window.addIngredient = () => {
    let inputAmount = document.querySelector("#input-amount");
    let inputUnit = document.querySelector("#input-unit");
    let inputIngredient = document.querySelector("#input-ingredients");

    // Update array
    let newIngredient = {
        amount: inputAmount.value,
        unit: inputUnit.value,
        name: inputIngredient.value
    }

    ingredients.push(newIngredient);

    // Reset input fields
    inputAmount.value = "";
    inputUnit.value = "";
    inputIngredient.value = "";

    // Append ingredient
    let table = document.querySelector("#ingredients-input");

    let html = "";

    for (const ingredient of ingredients) {                        
        html += `
            <tr>
                <td>${ingredient.amount} ${ingredient.unit}</td>
                <td>${ingredient.name}</td>
            </tr>
        `;
    }
            
    table.innerHTML = html;
}
    

window.addProcedure = () => {
    // Get input
    let inputProcedure = document.querySelector("#input-procedure");

    // Update array
    procedures.push(inputProcedure.value);

    // Reset input
    inputProcedure.value = "";

    // Append procedure
     let liste = document.querySelector("#procedure-input");

    let html = "";

    for (const procedure of procedures) {                        
        html += `
            <li>
            ${procedure}
            </li>
        `;
    }
            
    liste.innerHTML = html;

}

window.saveRecipe = () => {
    user.addRecipe(ingredients, procedures)
    ingredients = [];
    procedures = [];

    mealplanner.appendFavorites(user.favorites, user.myRecipes);
    router.navigateTo("#/favoritter");   
}



/* ------  ------ */

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

        let img = recipe.img != null ? recipe.img: "./img/" + day.toString().toLowerCase() + ".png";

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
                        <img src="${img}">
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
    let recipe = mealplanner.allRecipes.concat(user.myRecipes).find(recipe => recipe.id == recipeId);
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
    goToFoodPlanDetails(foodPlanId);
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