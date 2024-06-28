<template>
  <div id="container">
    <form @submit.prevent="submitForm">
      <div id="form-content">
      <div id = "info">
        <label for="name">Name:</label>
        <input type="text" v-model="recipe.name" id="name" />
      </div>

      <div>
        <label for="picture">Picture URL:</label>
        <input type="text" v-model="recipe.picture" id="picture" />
      </div>

      <div>
        <label for="preparationTime">Preparation Time:</label>
        <input type="text" v-model.number="recipe.preparationTime" id="preparationTime" />
      </div>

      <div>
        <label for="cookingTime">Cooking Time:</label>
        <input type="text" v-model.number="recipe.cookingTime" id="cookingTime" />
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea v-model="recipe.description" id="description"></textarea>
      </div>
      </div>

      <div id="ingredients">
      <div>
        <label for="ingredients">Ingredients:</label>
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
          <input type="text" v-model="recipe.ingredients[index]" />
          <button type="button" @click="removeIngredient(index)">Remove</button>
        </div>
        <button type="button" @click="addIngredient">Add Ingredient</button>
      </div>

        <div ID="more-info">
      <div>
        <label for="instructions">Instructions:</label>
        <div v-for="(instruction, index) in recipe.instructions" :key="index">
          <input type="text" v-model="recipe.instructions[index]" />
          <button type="button" @click="removeInstruction(index)">Remove</button>
        </div>
        <button type="button" @click="addInstruction">Add Instruction</button>
      </div>

      <div>
        <label for="dishType">Dish Type:</label>
        <input type="text" v-model="recipe.dishType" id="dishType" />
      </div>

      <div>
        <label for="mealTime">Meal Time:</label>
        <input type="text" v-model="recipe.mealTime" id="mealTime" />
      </div>

      <div>
        <label for="dietType">Diet Type:</label>
        <input type="text" v-model="recipe.dietType" id="dietType" />
      </div>
        </div>
      </div>
      <button type="submit">Save Recipe</button>
    </form>
    <pre>{{ newRecipe }}</pre>
  </div>
</template>

<script>
import api from "@/components/api.js"; // Make sure axios is correctly imported

export default {
  data() {
    return {
      recipe: {
        name: "",
        picture: "",
        preparationTime: "",
        cookingTime: "",
        description: "",
        ingredients: [""],
        instructions: [""],
        dishType: "",
        mealTime: "",
        dietType: ""
      },
      newRecipe: null
    };
  },
  methods: {
    addIngredient() {
      this.recipe.ingredients.push("");
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    addInstruction() {
      this.recipe.instructions.push("");
    },
    removeInstruction(index) {
      this.recipe.instructions.splice(index, 1);
    },
    async submitForm() {
      this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => ingredient.trim() !== "");
      this.recipe.instructions = this.recipe.instructions.filter(instruction => instruction.trim() !== "");

      this.newRecipe = { ...this.recipe }; // Shallow copy of recipe object

      try {
        console.log(this.newRecipe); // Log to check data before sending

        const response = await api.newRecipe(this.newRecipe); // Send to backend

        console.log(response); // Log response from backend
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
}

form div {
  margin-bottom: 1em;
}

input[type="text"], textarea {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  padding: 0.5em 1em;
  color: white;
  background-color: #749fd1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #1f3c63;
}

#form-content {

}
#container {
  height: 100vh;
  margin-top: 100px;
  margin-left: 50vh;
}
</style>