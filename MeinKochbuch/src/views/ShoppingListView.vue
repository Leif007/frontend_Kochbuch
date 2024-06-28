<script setup props="shoppingList">

import { computed, watchEffect, ref } from 'vue';

const props = defineProps({
  shoppingList: String
});

const shoppingList = ref([]);

watchEffect(() => {
  const newShoppingList = props.shoppingList;
  if (newShoppingList) {
    shoppingList.value = JSON.parse(newShoppingList).map(item => ({ name: item, selected: false }));
  } else {
    shoppingList.value = [];
  }
});
</script>


<template>
  <main>
    <h1>Shopping List</h1>
    <p>Here you can see what ingredients are needed for the chosen recipe. You can click on the button next to the ingredients to mark them off</p>
  </main>
  <div class="shoppingList">
    <h1>Shopping List</h1>
    <ul>
      <li v-for="item in shoppingList" :key="item.name">
        <input type="checkbox" v-model="item.selected">
        <span :class="{ 'item-selected': item.selected }">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.shoppingList {
  margin-top: 5rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 5px;
}

.item-selected {
  text-decoration: line-through;
}

</style>