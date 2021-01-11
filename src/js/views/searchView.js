import { elements } from './base'

export const getInput = () => {
    return elements.searchInput.value
}

export const clearInput = () => {
    elements.searchInput.value = ""
}

export const highLightSelected = (id) => {
    Array.from(document.querySelectorAll(`.results__link`)).forEach(el => {
        el.classList.remove('results__link--active')
    })
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
}

export const clearSearchResList = () => {
    elements.searchResList.innerHTML = ""
    elements.resPage.innerHTML = ""
}

export const renderRecipes = (recipes, page = 1, resPerPage = 5) => {
    const start = (page - 1) * resPerPage
    const end = page * resPerPage
    recipes.slice(start, end).forEach(renderRecipe)
    displayButtons(page, recipes.length, resPerPage)
}

export const  limitRecipeTitle = (title, limit = 17) => {
    const titleArr = []
    if (title.length > limit) {
        title.split(" ").reduce((acc, word) => {
            if (acc + word.length <= limit) {
                titleArr.push(word)
            }
            return acc + word.length
        }, 0)
        title = `${titleArr.join(" ")} ...`
    }
    return title
}

const createButton = (page, type) => {
    return `
        <button class="btn-inline results__btn--${type}" data-goto="${type === "prev" ? page - 1 : page + 1}">
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right"}"></use>
        </svg>
        </button>
    `
}

const displayButtons = (page, result, resPerPage) => {
    const pages = Math.ceil(result / resPerPage)

    if (page === 1 && pages > 1) { elements.resPage.insertAdjacentHTML("afterbegin", createButton(page, "next")) }
    else if (page === pages && page > 1) { elements.resPage.insertAdjacentHTML("afterbegin", createButton(page, "prev")) } //display back button
    else { elements.resPage.insertAdjacentHTML("afterbegin", `${createButton(page, "prev")}${createButton(page, "next")}`) }
}

export const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.id}">
            <figure class="results__fig">
                <img src="https://spoonacular.com/recipeImages/${recipe.image}" alt="${recipe.title}">
            </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">Ready in ${recipe.readyInMinutes} minutes</p>
                </div>
        </a>
    </li>
    `
    elements.searchResList.insertAdjacentHTML("beforeend", markup)
}

