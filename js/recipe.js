export default class Recipe {
    constructor(title, description, img, rating, time, price, country, gluten, vegetarian, 
                vegan, sugar, dairy, season, theme, holiday, ingredients, procedure) {
        this.id = Date.now();
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
            <article class="recipe-container" onclick="alert('Details')">
                <div class="top">
                    <div>${this.returnIconHTML(this.gluten, this.vegetarian, this.vegan, this.sugar, this.dairy)}</div>
                    <h2>${this.title}</h2>
                    <span class="material-icons" onclick="alert('Favorited')">favorite_outline</span>
                </div>
                <div class="image-wrapper"><img src="${this.img}" alt="${this.title}"></div>
                <div class="bottom">
                    <p>${this.returnStarsHTML(this.rating)}</p>
                    <p><span class="material-icons">schedule</span>${this.time} min</p>
                    <p><span class="material-icons">attach_money</span>${this.price}</p>
                    <span class="material-icons" onclick="alert('Added')">add</span>
                </div>
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