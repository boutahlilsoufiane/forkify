import axios from "axios"
import {key} from "../config"

export default class Search {

    constructor(query) {
        this.query = query;
    }

    async searchRecipe() {
        try {
            const result = await axios(`https://api.spoonacular.com/recipes/search?query=${this.query}&number=100&apiKey=${key}`)
            this.recipes = result.data.results
        } catch (error) {
            alert(error)
        }
    }

}