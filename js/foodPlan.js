export default class FoodPlan {
    constructor(name) {
        this.id = Date.now();
        this.title = name;
        this.img = "";
        this.days = [{}, {}, {}, {}, {}, {}, {}];
        this.updateImage();
    }

    addRecipeToDay(index, recipe) {
        this.days[index] = recipe;
        this.updateImage();
    }

    /*todo properly*/
    removeRecipeFromDay(index) {
        this.days[index] = {};
        this.updateImage();
    }

    updateImage() {
        for (const recipe of this.days) {
            if (recipe.img) {
                this.img = recipe.img;
                break;
            } else {
                this.img = "./img/mandag.png";
            }
        }
    }

    getHtml() {
        this.updateImage();
        return /*html*/`
            <article class="food-plan">
                <div class="image-wrapper">
                    <img src="${this.img}">
                </div>
                <div class="text-wrapper">
                    <div>
                        <h2>Din madplan</h2>
                        <h3>${this.title}</h3>
                    </div>
                    <button type="button" onclick="goToFoodPlanDetails(${this.id})">Se madplan</button>
                </div>
            </article>
        `;
    }

    getDetailHTML() {

        let html = "";

        let day = "";

        let i = 0;

        for (const recipe of this.days) {
            let title = recipe.title != null ? recipe.title : "Ingen opskrift";
            let button = recipe.title != null ? /*html*/`<button type="button" onclick="goToDetails(${recipe.id})">Se opskrift</button>`
                                              : /*html*/`<button type="button" onclick="goToSearch()">Tilføj opskrift</button>`;


            let remove = recipe.title != null ? /*html*/`<span class="material-icons remove-button" onclick="removeRecipeFromDay(${this.id}, ${i})">close</span>` : "";
            

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

            i++;

            let img = recipe.img != null ? recipe.img: "./img/" + day.toString().toLowerCase() + ".png";

            html += /*html*/`
                <article class="food-plan">
                    <div class="image-wrapper">
                        <img src="${img}">
                    </div>
                    <div class="text-wrapper">
                        ${remove}
                        <div>
                            <h2>${day}</h2>
                            <h3>${title}</h3>
                        </div>
                        ${button}
                    </div>
                </article>
            `;
        }

        return html;
    }

    getPickHtml(id) {
        return /*html*/`
            <article class="food-plan">
                <div class="image-wrapper">
                    <img src="${this.img}">
                </div>
                <div class="text-wrapper">
                    <div>
                        <h2>Din madplan</h2>
                        <h3>${this.title}</h3>
                    </div>
                    <button type="button" onclick="chooseFoodPlan(${this.id}, ${id})">Vælg</button>
                </div>
            </article>
        `;
    }
}