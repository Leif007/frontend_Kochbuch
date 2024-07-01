<template>
  <div class="container">
    <h2>Recipes</h2>
    <div v-if="recipes.length">
      <div class="grid">
        <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
          <div class="recipe-header" @click="toggleRecipe(recipe)">
            <h3>{{ recipe.name }}</h3>
            <span v-if="recipe.expanded">&#9650;</span>
            <span v-else>&#9660;</span>
          </div>
          <transition name="fade">
            <div v-if="recipe.expanded" class="recipe-details">
              <RecipeDetail :recipe="recipe" @update="handleUpdateRecipe" @delete="handleDeleteRecipe" />
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No recipes found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import RecipeDetail from "@/components/RecipeDetail.vue";

export default {
  components: {
    RecipeDetail
  },
  data() {
    return {
      recipes: []
    };
  },
  methods: {
    async fetchRecipes() {
      try {
        const response = await axios.get('http://localhost:8080/recipes');
        this.recipes = response.data.map(recipe => ({
          ...recipe,
          expanded: false  // Add 'expanded' property for each recipe
        }));
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    },
    async handleUpdateRecipe(updatedRecipe) {
      try {
        await axios.put(`http://localhost:8080/recipe/${updatedRecipe.id}`, updatedRecipe);
        this.fetchRecipes(); // Refresh recipes after update
      } catch (error) {
        console.error('Error updating recipe:', error);
      }
    },
    async handleDeleteRecipe(recipeId) {
      if (confirm('Are you sure you want to delete this recipe?')) {
        try {
          await axios.delete(`http://localhost:8080/recipe/${recipeId}`);
          this.fetchRecipes(); // Refresh recipes after delete
        } catch (error) {
          console.error('Error deleting recipe:', error);
        }
      }
    },
    toggleRecipe(recipe) {
      recipe.expanded = !recipe.expanded;  // Toggle 'expanded' property of clicked recipe
    }
  },
  mounted() {
    this.fetchRecipes();
  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.recipe-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow: hidden;
  cursor: pointer;
}

.recipe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recipe-header h3 {
  margin: 0;
  color: #007bff;
}

.recipe-details {
  padding-top: 10px;
  border-top: 1px solid #e0e0e0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
