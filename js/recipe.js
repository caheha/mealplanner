let i = 0;

export default class Recipe {
    constructor(title, description, img, rating, time, price, country, gluten, vegetarian, 
                vegan, sugar, dairy, season, theme, holiday, ingredients, procedure) {
        this.id = i++;
        this.title = title;
        this.description = description;
        this.img = img;
        this.rating = rating;
        this.time = time;
        this.price = price;

        this.country = country;

        this.gluten = gluten;
        this.vegetarian = vegetarian;
        this.vegan = vegan;
        this.sugar = sugar;
        this.dairy = dairy;

        this.season = season;
        this.theme = theme;
        this.holiday = holiday;

        this.ingredients = ingredients;
        this.procedure = procedure;   
    }

    // Returnerer HTML der kan indsættes på siden
    getHtml() {
        return /*html*/`
            <article class="recipe-container">
                <div class="top">
                    <div>${this.returnIconHTML(this.gluten, this.vegetarian, this.vegan, this.sugar, this.dairy)}</div>
                    <h2>${this.title}</h2>
                    <span id="button-${this.id}" class="material-icons favorite" onclick="favorite(${this.id})">favorite_outline</span>
                </div>
                <div class="image-wrapper" onclick="goToDetails(${this.id})"><img src="${this.img}" alt="${this.title}"></div>
                <div class="bottom">
                    <p>${this.returnStarsHTML(this.rating)}</p>
                    <p><span class="material-icons">schedule</span>${this.time} min</p>
                    <p><span class="material-icons">attach_money</span>${this.price}</p>
                    <span class="material-icons" onclick="alert('Added')">add</span>
                </div>
            </article>
        `;
    }

    getDetailHTML() {
        let ingredientsHTML = "";
        for (const ingredient of this.ingredients) {
            ingredientsHTML += /*html*/`
                <tr>
                    <td id="recipe-amount">${ingredient.amount}</td>
                    <td>${ingredient.unit}</td>
                    <td>${ingredient.name}</td>
                </tr>
                `;
        }

        let procedureHTML = "";
        for (const procedure of this.procedure) {
            procedureHTML += `<li>${procedure}</li>`;
        }

        return /*html*/`
            <article class="recipe-details-container">
                <div class="recipe-name">
                    <h2>Spaghetti Carbonara</h2>
                    <div class="icons" >${this.returnIconHTML(this.gluten, this.vegetarian, this.vegan, this.sugar, this.dairy)}</div>
                    <div>
                        <span class="material-icons">add</span>
                        <span id="button-${this.id}" class="material-icons favorite" onclick="favorite(${this.id})">favorite_outline</span>
                     </div>
                </div>
                <div class="image-wrapper" onclick="goToDetails(${this.id})"><img src="${this.img}" alt="${this.title}"></div>
                <div class="bottom">
                    <p>${this.returnStarsHTML(this.rating)}</p>
                    <p><span class="material-icons">schedule</span>${this.time} min</p>
                    <p><span class="material-icons">attach_money</span>${this.price}</p>
                </div>

                <h3>Beskrivelse</h3>
                <p>${this.description}</p>

                <label for="sortBy">
                    <select id="sortBy" onchange="multiplyAmount(this.value)">
                        <option value="" selected disabled>Antal personer</option>
                        <option value="1">1 personer</option>
                        <option value="2">2 personer</option>
                        <option value="3">3 personer</option>
                        <option value="4">4 personer</option>
                        <option value="5">5 personer</option>
                    </select>
                </label>
                
                <h3>Ingredienser</h3>
                <table>${ingredientsHTML}</table>
                
                <h3>Fremgangsmåde</h3>
                <ul>${procedureHTML}</ul>
            </article>
        `;
    }

    // Returnerer HTML med ikoner til opskriften, hvis de enkelte properties er true
    returnIconHTML(gluten, vegetarian, vegan, sugar, dairy) {
        let html = "";

        /* Tilføj billedikoner */
        if (gluten) { html += `<img src="../img/gluten.png">` }
        if (vegetarian) { html += `<img src="../img/vegetarian.png">` }
        if (vegan) { html += `<img src="../img/vegan.png">` }
        if (sugar) { html += `<img src="../img/sugar.png">` }
        if (dairy) { html += `<img src="../img/dairy.png">` }
        
        return html;
    }

    // Returnerer HTML med 5 stjerner, antal udfyldte afhænger af this.rating (0-5);
    returnStarsHTML(rating) {
        let html = "";

        /* Tilføj udfyldt stjerne så længe i < rating */
        for (let i = 0; i < rating; i++) {
            html += `<span class="material-icons">star</span>`;
        }
        /* Tilføj omridset stjerne så længe i > rating */
        for (let i = 5; i > rating; i--) {
            html += `<span class="material-icons">star_outline</span>`;
        }
        
        return html;
    }
}