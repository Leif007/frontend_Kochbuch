<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/addRecipe">Add Recipe</router-link></li>
      <li><router-link to="/shoppinglist">Shopping List</router-link></li>
      <li><router-link to="/recipes">Recipes List</router-link></li>
    </ul>
  </nav>
</template>

<style>
nav {
  background-color: #333;
  color: #fff;
  padding: 10px;
}
ul {
  list-style-type: none;
  display: flex;
  gap: 20px;
}
li {
  display: inline;
}
a {
  color: white;
  text-decoration: none;
}
</style>
<script setup>
</script>