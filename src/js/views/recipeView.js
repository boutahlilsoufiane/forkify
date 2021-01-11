import { elements } from './base'
import { Fraction } from 'fractional'
export const clearRecipe = () => {
    elements.recipe.innerHTML = ""
}

const formatCount = (count) => {
    if (count) {
        const [integer, decimal] = count.toString().split(".").map(el => parseInt(el, 10))

        if (!decimal) return count

        if (integer == 0) {
            const f = new Fraction(count)
            return `${f.numerator}/${f.denominator}`
        } else {
            const f = new Fraction(count - integer)
            return `${integer} ${f.numerator}/${f.denominator}`
        }

    }
    return "?"
}

const renderIngredient = ingredient => {
    const markup = `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${formatCount(ingredient.count)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
            </div>
        </li>
    `
    return markup
}

export const renderRecipe = (recipe, isliked) => {
    const markup = `
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time ? recipe.time : "-"}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.serving}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#${isliked ? "icon-heart" : "icon-heart-outlined"}"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(ing => renderIngredient(ing)).join("")}                 
                </ul>

                <button class="btn-small recipe__btn recipe__btn--add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.author}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `
    elements.recipe.insertAdjacentHTML("afterbegin", markup)
}

export const updateServingsIngredients = (recipe) => {
    // update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.serving

    //update ingredients
    Array.from(document.querySelectorAll('.recipe__count')).forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count)
    })
} 