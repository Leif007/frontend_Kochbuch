<script>

import { RouterLink } from 'vue-router'
</script>

<template>
  <div id="box">
  <ul>
    <li class='home'>
      <RouterLink to='/'>
        Home
      </RouterLink>
    </li>

    <li>
      <RouterLink to='/recipes'>
        Alle Rezepte
      </RouterLink>
    </li>

    <li>
      <RouterLink to='/addRecipe'>
        Rezept hinzufügen
      </RouterLink>
    </li>

    <li>
      <RouterLink to='/shoppinglist'>
        Shoppingliste
      </RouterLink>
    </li>


  </ul>
</div>
</template>

<style scoped>
.home {
  float: left;
}

ul {
  font-family: Arial, sans-serif;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #749fd1;
  position: fixed;
  top: 0;
  width: 100%;
}

li {
  float: right;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #1f3c63;
}
</style>