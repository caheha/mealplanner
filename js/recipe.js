// Recipe index
let i = 0;

// Recipe class
export default class Recipe {
    constructor(title, description, img, rating, time, price, country, glutenfree, vegetarian, 
                vegan, sugarfree, dairyfree, season, theme, holiday, ingredients, procedure) {
        this.id = i++;
        this.title = title;
        this.description = description;
        this.img = img;
        this.rating = rating;
        this.time = time;
        this.price = price;
        this.country = country;
        this.glutenfree = glutenfree;
        this.vegetarian = vegetarian;
        this.vegan = vegan;
        this.sugarfree = sugarfree;
        this.dairyfree = dairyfree;
        this.season = season;
        this.theme = theme;
        this.holiday = holiday;
        this.ingredients = ingredients;
        this.procedure = procedure;   
    }

    // Natascha - Returns HTML on search/favorites page
    getHtml() {
        return /*html*/`
            <article class="recipe-container">
                <div class="top">
                    <div>${this.returnIconHTML(this.glutenfree, this.vegetarian, this.vegan, this.sugarfree, this.dairyfree)}</div>
                    <h2>${this.title}</h2>
                    <span id="button-${this.id}" class="material-icons favorite" onclick="favorite(${this.id})">favorite_outline</span>
                </div>
                <div class="image-wrapper" onclick="goToDetails(${this.id})"><img src="${this.img}" alt="${this.title}"></div>
                <div class="bottom">
                    <p>${this.returnStarsHTML(this.rating)}</p>
                    <p><span class="material-icons">schedule</span>${this.time} min</p>
                    <p><span class="material-icons">attach_money</span>${this.price}</p>
                    <span id="add-${this.id}" class="material-icons" onclick="showMenu(${this.id})">add</span>
                </div>
            </article>
        `;
    }

    // Natascha - Returns recipe details for details page
    getDetailHTML() {
        let procedureHTML = "";
        for (const procedure of this.procedure) {
            procedureHTML += `<li>${procedure}</li>`;
        }

        return /*html*/`
            <article class="recipe-details-container">
                <div class="recipe-name">
                    <h2>${this.title}</h2>
                    <div class="icons" >${this.returnIconHTML(this.glutenfree, this.vegetarian, this.vegan, this.sugarfree, this.dairyfree)}</div>
                    <div>
                        <span id="add-${this.id}" class="material-icons" onclick="showMenu(${this.id})">add</span>
                        <span id="button-${this.id}" class="material-icons favorite" onclick="favorite(${this.id})">favorite_outline</span>
                     </div>
                </div>
                <div class="image-wrapper"><img src="${this.img}" alt="${this.title}"></div>
                <div class="bottom">
                    <p>${this.returnStarsHTML(this.rating)}</p>
                    <p><span class="material-icons">schedule</span>${this.time} min</p>
                    <p><span class="material-icons">attach_money</span>${this.price}</p>
                </div>

                <h3>Beskrivelse</h3>
                <p>${this.description}</p>

                <div class="dropdown">
                    <label for="sortBy">
                        <select id="sortBy" onchange="multiplyAmount(${this.id}, this.value)">
                            <option value="" selected disabled>Antal personer</option>
                            <option value="1">1 personer</option>
                            <option value="2">2 personer</option>
                            <option value="3">3 personer</option>
                            <option value="4">4 personer</option>
                            <option value="5">5 personer</option>
                        </select>
                    </label>
                </div>
                
                <h3>Ingredienser</h3>
                <table id="ingredients-table"></table>
                
                <h3>Fremgangsmåde</h3>
                <ul>${procedureHTML}</ul>
            </article>
        `;
    }

    // Natascha - Returns table innerHTML for every ingredient
    returnIngredientsHTML(amount) {
        let ingredientsHTML = "";
        for (const ingredient of this.ingredients) {
            if (ingredient.amount * amount == 0) {
                ingredientsHTML += /*html*/`
                <tr>
                    <td>${ingredient.unit}</td>
                    <td>${ingredient.name}</td>
                </tr>
                `;
            } else {
                ingredientsHTML += /*html*/`
                <tr>
                    <td>${ingredient.amount * amount} ${ingredient.unit}</td>
                    <td>${ingredient.name}</td>
                </tr>
                `;
            }
        }
        return ingredientsHTML;
    }

    // Casper - Returns icon HTML, if true an icon is added
    returnIconHTML(glutenfree, vegetarian, vegan, sugarfree, dairyfree) {
        let html = "";

        if (glutenfree) { html += `<img src="../img/gluten.png">` }
        if (vegetarian) { html += `<img src="../img/vegetarian.png">` }
        if (vegan) { html += `<img src="../img/vegan.png">` }
        if (sugarfree) { html += `<img src="../img/sugar.png">` }
        if (dairyfree) { html += `<img src="../img/dairy.png">` }
        
        return html;
    }

    // Casper - Returns rating HTML, returns a total of 5 stars
    returnStarsHTML(rating) {
        let html = "";

        /* Adds a filled out star if i < rating */
        for (let i = 0; i < rating; i++) {
            html += `<span class="material-icons">star</span>`;
        }
        /* Adds an outlined star if i > rating */
        for (let i = 5; i > rating; i--) {
            html += `<span class="material-icons">star_outline</span>`;
        }
        
        return html;
    }
}