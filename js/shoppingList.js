export default class ShoppingList {
    constructor(title, ingredients) {
        this.id = Date.now();
        this.title = title;
        this.ingredients = ingredients;
    }

    getHtml() {
        return /*html*/`
            <div onclick="shoppingListDetails(${this.id})" class="shopping-list-item">
                ${this.title}
                <span class="material-icons">chevron_right</span>
            </div>
        `;
    }

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

    checkIngredient(ingredientId) {
        let ingredientToCheck = this.ingredients.find(ingredient => ingredient.id == ingredientId);
        ingredientToCheck.status = true;
    }

    uncheckIngredient(ingredientId) {
        let ingredientToUncheck = this.ingredients.find(ingredient =>ingredient.id == ingredientId);
        ingredientToUncheck.status = false;
    }

    addIngredient(ingredientName, ingredientAmount) {
        let newIngredient = {
            id: Date.now(),
            name: ingredientName,
            amount: ingredientAmount,
            status: false
        }
        this.ingredients.push(newIngredient);
    }

    removeIngredient(ingredientToRemove) {
        this.ingredients = this.ingredients.filter(ingredient => ingredient.name != ingredientToRemove.name);
    }
}