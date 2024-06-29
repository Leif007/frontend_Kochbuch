<template>
  <div id="recipe-list">
    <h2>Recipes</h2>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        <router-link :to="'/recipe/' + recipe.id">{{ recipe.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/components/api.js';

export default {
  data() {
    return {
      recipes: []
    };
  },
  async mounted() {
    try {
      const response = await api.getAllRecipes();
      console.log('API Response:', response); // Check the entire response object
      this.recipes = response.data; // Assuming the data is in response.data
    } catch (error) {
      console.error('Error fetching recipes:', error);
      if (error.response) {
        console.error('Error response:', error.response.data); // Log the specific error response
      }
    }
  }
};
</script>

<style scoped>
#recipe-list {
  max-width: 600px;
  margin: auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

router-link {
  text-decoration: none;
  color: #007bff;
  cursor: pointer;
}

router-link:hover {
  text-decoration: underline;
}
</style>