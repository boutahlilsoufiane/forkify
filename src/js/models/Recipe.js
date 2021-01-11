import axios from 'axios';
import { key } from '../config';

export class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      console.log('test');
      const result = await axios(
        `https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}`
      );
      this.title = result.data.title;
      this.author = result.data.sourceName;
      this.img = result.data.image;
      this.sourceUrl = result.data.sourceUrl;
      this.ingredients = result.data.extendedIngredients;
      this.time = result.data.preparationMinutes;
      this.serving = result.data.servings;
    } catch (error) {
      alert(error);
    }
  }

  parseIngredients() {
    const unitsLong = ['cups', 'Tbsps', 'Tbsp', 'tsps', 'bunches'];
    const unitsShort = ['cup', 'tbsp', 'tbsp', 'tsp', 'bunch'];

    const ingredients = this.ingredients.map((el) => {
      var unit = el.measures.us.unitShort;
      unitsLong.forEach((ele, i) => (unit = unit.replace(ele, unitsShort[i])));
      return {
        count: el.measures.us.amount,
        unit: unit,
        description: el.originalName.toLowerCase(),
      };
    });
    this.ingredients = ingredients;
  }

  updateServings(type) {
    const newServings = type == 'inc' ? this.serving + 1 : this.serving - 1;
    this.ingredients.forEach(
      (ing) => (ing.count *= newServings / this.serving)
    );
    this.serving = newServings;
  }
}
