<script setup>
import { ref, onMounted } from 'vue';
import api from "@/components/api.js";

const recipes = ref([]);

const loadRecipes = async () => {
  try {
    const response = await api.allRecipes();
    recipes.value = response.data;
  } catch (error) {
    console.log(error, 'Fehler beim Laden der Rezepte');
  }
};

onMounted(loadRecipes);
</script>

<template>
  <ul>
    <li v-for="(recipe,) in recipes" :key="index">
      {{ recipe }}
    </li>
  </ul>
</template>

<style scoped>

</style>