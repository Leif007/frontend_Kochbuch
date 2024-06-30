<template>
  <div class="recipe-detail">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="localRecipe.name" id="name" required />
      </div>

      <div class="form-group">
        <label for="cookingTime">Cooking Time (minutes):</label>
        <input type="number" v-model.number="localRecipe.cookingTime" id="cookingTime" required />
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="localRecipe.description" id="description" required></textarea>
      </div>

      <div class="form-group">
        <label for="ingredients">Ingredients:</label>
        <div v-for="(ingredient, index) in localRecipe.ingredients" :key="index" class="input-group">
          <input type="text" v-model="localRecipe.ingredients[index]" placeholder="Enter ingredient" />
          <button type="button" @click="removeIngredient(index)" class="btn-remove">Remove</button>
        </div>
        <button type="button" @click="addIngredient" class="btn-add">Add Ingredient</button>
      </div>

      <div class="form-group">
        <label for="instructions">Instructions:</label>
        <div v-for="(instruction, index) in localRecipe.instructions" :key="index" class="input-group">
          <input type="text" v-model="localRecipe.instructions[index]" placeholder="Enter instruction" />
          <button type="button" @click="removeInstruction(index)" class="btn-remove">Remove</button>
        </div>
        <button type="button" @click="addInstruction" class="btn-add">Add Instruction</button>
      </div>

      <div class="form-group">
        <label for="dishType">Dish Type:</label>
        <input type="text" v-model="localRecipe.dishType" id="dishType" required />
      </div>

      <div class="form-group">
        <label for="mealTime">Meal Time:</label>
        <input type="text" v-model="localRecipe.mealTime" id="mealTime" required />
      </div>

      <div class="form-group">
        <label for="dietType">Diet Type:</label>
        <input type="text" v-model="localRecipe.dietType" id="dietType" required />
      </div>

      <div class="button-group">
        <button type="submit" class="btn-submit">Save Changes</button>
        <button type="button" @click="deleteRecipe" class="btn-delete">Delete Recipe</button>
      </div>
    </form>
    <div v-if="showSuccessMessage" class="success-message">
      Recipe updated successfully!
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['recipe'],
  data() {
    return {
      localRecipe: { ...this.recipe },
      showSuccessMessage: false
    };
  },
  methods: {
    addIngredient() {
      this.localRecipe.ingredients.push("");
    },
    removeIngredient(index) {
      this.localRecipe.ingredients.splice(index, 1);
    },
    addInstruction() {
      this.localRecipe.instructions.push("");
    },
    removeInstruction(index) {
      this.localRecipe.instructions.splice(index, 1);
    },
    async submitForm() {
      try {
        await axios.put(`http://localhost:8080/recipe/${this.localRecipe.id}`, this.localRecipe);
        this.showSuccessNotification();
        this.$emit('update');
      } catch (error) {
        console.error('Error updating recipe:', error);
      }
    },
    async deleteRecipe() {
      if (confirm('Are you sure you want to delete this recipe?')) {
        try {
          await axios.delete(`http://localhost:8080/recipe/${this.localRecipe.id}`);
          this.$emit('delete');
        } catch (error) {
          console.error('Error deleting recipe:', error);
        }
      }
    },
    showSuccessNotification() {
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.recipe-detail {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn-add,
.btn-remove,
.btn-submit,
.btn-delete {
  padding: 10px 20px;
  color: #fff;
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
  background-color: #007bff;
}

.btn-delete {
  background-color: #dc3545;
}

.success-message {
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #d4edda;
  background-color: #d4edda;
  color: #155724;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
}
</style>
