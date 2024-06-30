<template>
  <div class="container">
    <div class="card">
      <h2>Add Recipe</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="recipe.name" id="name" required />
        </div>

        <div class="form-group">
          <label for="cookingTime">Cooking Time (minutes):</label>
          <input type="number" v-model.number="recipe.cookingTime" id="cookingTime" required />
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="recipe.description" id="description" required></textarea>
        </div>

        <div class="form-group">
          <label for="ingredients">Ingredients:</label>
          <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="input-group">
            <input type="text" v-model="recipe.ingredients[index]" placeholder="Enter ingredient" />
            <button type="button" @click="removeIngredient(index)" class="btn-remove">Remove</button>
          </div>
          <button type="button" @click="addIngredient" class="btn-add">Add Ingredient</button>
        </div>

        <div class="form-group">
          <label for="instructions">Instructions:</label>
          <div v-for="(instruction, index) in recipe.instructions" :key="index" class="input-group">
            <input type="text" v-model="recipe.instructions[index]" placeholder="Enter instruction" />
            <button type="button" @click="removeInstruction(index)" class="btn-remove">Remove</button>
          </div>
          <button type="button" @click="addInstruction" class="btn-add">Add Instruction</button>
        </div>

        <div class="form-group">
          <label for="dishType">Dish Type:</label>
          <input type="text" v-model="recipe.dishType" id="dishType" required />
        </div>

        <div class="form-group">
          <label for="mealTime">Meal Time:</label>
          <input type="text" v-model="recipe.mealTime" id="mealTime" required />
        </div>

        <div class="form-group">
          <label for="dietType">Diet Type:</label>
          <input type="text" v-model="recipe.dietType" id="dietType" required />
        </div>

        <button type="submit" class="btn-submit">Save Recipe</button>
      </form>
    </div>

    <div v-if="showSuccessMessage" class="success-message">
      Recipe saved successfully!
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      recipe: {
        name: "",
        cookingTime: 0,
        description: "",
        ingredients: [""],
        instructions: [""],
        dishType: "",
        mealTime: "",
        dietType: ""
      },
      showSuccessMessage: false
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
      this.recipe.ingredients = this.recipe.ingredients.filter(i => i.trim() !== "");
      this.recipe.instructions = this.recipe.instructions.filter(i => i.trim() !== "");

      try {
        await axios.post('http://localhost:8080/recipe', this.recipe);
        this.showSuccessNotification();
        this.resetForm();
      } catch (error) {
        console.error('Error submitting recipe:', error);
        alert('Failed to add recipe');
      }
    },
    showSuccessNotification() {
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    },
    resetForm() {
      this.recipe = {
        name: "",
        cookingTime: 0,
        description: "",
        ingredients: [""],
        instructions: [""],
        dishType: "",
        mealTime: "",
        dietType: ""
      };
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
}

.card {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 16px;
}

textarea {
  resize: vertical;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-group input {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
}

.btn-add,
.btn-remove,
.btn-submit {
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-add {
  margin-top: 10px;
  background-color: #28a745;
}

.btn-remove {
  background-color: #dc3545;
}

.btn-submit {
  display: block;
  width: 100%;
  background-color: #007bff;
  margin-top: 20px;
}

.btn-add:hover,
.btn-remove:hover,
.btn-submit:hover {
  opacity: 0.9;
}

.success-message {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #d4edda;
  background-color: #d4edda;
  color: #155724;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
