
import Search from './models/Search'
import { Recipe } from './models/Recipe'
import { List } from './models/List'
import { Like } from './models/Like'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likeView from './views/likeView'
import { elements, displayLoader, removeLoader } from './views/base'


/*-----Global state------*/
const state = {}
state.like = new Like()
likeView.toggleLikeMenu(state.like.getNumLikes())

async function searchControl() {
    try {

        const query = searchView.getInput()

        //add  search object to query
        if (query) {
            state.search = new Search(query)
        }

        //prepare UI
        searchView.clearInput()
        searchView.clearSearchResList()
        displayLoader(elements.result)

        //search for recipe
        await state.search.searchRecipe()

        //render recipe to UI
        removeLoader()
        if (state.search.recipes) {
            searchView.renderRecipes(state.search.recipes)
        }

    } catch (error) {

        alert(error)
    }
}


elements.searchForm.addEventListener("submit", e => {
    e.preventDefault()
    searchControl()
})

elements.resPage.addEventListener("click", e => {
    const button = e.target.closest(".btn-inline")
    if (button) {
        const page = parseInt(button.dataset.goto, 10)
        searchView.clearSearchResList()
        searchView.renderRecipes(state.search.recipes, page)
    }
})


//Recipe controller
const controlRecipe = async () => {
    //take recipe id
    const id = window.location.hash.replace("#", "")



    if (state.search) searchView.highLightSelected(id)

    //check if id is full
    if (id) {

        try {
            //prepare ui
            recipeView.clearRecipe()
            displayLoader(elements.recipe)

            //get recipe object
            state.recipe = new Recipe(id)

            //call function get recipe
            await state.recipe.getRecipe()
            state.recipe.parseIngredients()

            //display recipe
            removeLoader()
            recipeView.renderRecipe(state.recipe, state.like.isLiked(id))
        } catch (error) {
            alert(error)
        }
    }
}

["hashchange", "load"].forEach(event => window.addEventListener(event, controlRecipe))

const controlList = () => {
    if (!state.list) state.list = new List()
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.description)
        listView.renderItem(item)
    })
}

const controlLike = () => {
    const recipe = state.recipe
    if (!state.like.isLiked(state.recipe.id)) {

        //Add like to our model
        const newLike = state.like.addLike(recipe.id, recipe.title, recipe.time, recipe.img)

        //Toggle the button
        likeView.toggleLikeBtn(true)

        //Add like to UI
        likeView.renderLike(newLike)

    } else {
        //delete like from our model
        state.like.deleteLike(recipe.id)

        //Toggle the button
        likeView.toggleLikeBtn(false)

        //remove like to UI
        likeView.deleteLike(recipe.id)
    }
    likeView.toggleLikeMenu(state.like.getNumLikes())
}

elements.shoppingList.addEventListener('click', e => {
    const itemId = e.target.closest('.shopping__item').dataset.itemid
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(itemId)
        listView.removeItem(itemId)
    } else if (e.target.matches('.shopping__count-value')) {
        const count = e.target.value
        state.list.updateCount(itemId, parseInt(count, 10))
    }
})


elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc')
        recipeView.updateServingsIngredients(state.recipe)
    } else if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.serving > 1) {
            state.recipe.updateServings('dec')
            recipeView.updateServingsIngredients(state.recipe)
        }
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList()
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike()
    }
})

window.addEventListener('load', e => {
    //create likes object
    state.like = new Like()

    //restore likes
    state.like.restoreLikes()

    //toggle like menu
    likeView.toggleLikeMenu(state.like.getNumLikes())

    //render likes
    state.like.likes.forEach(el => likeView.renderLike(el))
})
