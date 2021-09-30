// ShoppingList class
export default class ShoppingList {
    constructor(title, ingredients) {
        this.id = Date.now();
        this.title = title;
        this.ingredients = ingredients;
    }

    // Casper - Returns HTML for shopping lists page
    getHtml() {
        return /*html*/`
            <div onclick="shoppingListDetails(${this.id})" class="shopping-list-item">
                ${this.title}
                <span class="material-icons">chevron_right</span>
            </div>
        `;
    }

    // Casper - Returns shopping list details with button to check/uncheck status
    getDetailHtml() {
        let html = "";

        for (const ingredient of this.ingredients) {
            let checkBox = ingredient.status ? /*html*/`<div onclick="uncheckIngredient(${this.id}, ${ingredient.id})" class="check-box checked"><span class="material-icons">check</span></div>`
                                             : /*html*/`<div onclick="checkIngredient(${this.id}, ${ingredient.id})"class="check-box"></div>`;
            html += /*html*/`
                <div class="check-box-wrapper">
                    <div class="shopping-list-item"><p>${ingredient.name}</p><p>${ingredient.amount}</p></div>
                    ${checkBox}
                </div>
            `;
        }
        return html;
    }

    // Natascha - Changes status of ingredient to true (in shopping basket)
    checkIngredient(ingredientId) {
        const ingredientToCheck = this.ingredients.find(ingredient => ingredient.id == ingredientId);
        ingredientToCheck.status = true;
    }

    // Natascha - Changes status of ingredient to false (not in shopping basket)
    uncheckIngredient(ingredientId) {
        const ingredientToUncheck = this.ingredients.find(ingredient =>ingredient.id == ingredientId);
        ingredientToUncheck.status = false;
    }

    // Casper - Adds an ingredient to the shopping list
    addIngredient(ingredientName, ingredientAmount) {
        let newIngredient = {
            id: Date.now(),
            name: ingredientName,
            amount: ingredientAmount,
            status: false
        }
        this.ingredients.push(newIngredient);
    }
}