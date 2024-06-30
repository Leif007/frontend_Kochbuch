import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import AddRecipeView from '../views/AddRecipeView.vue';
import ShoppingListView from '../views/ShoppingListView.vue';
import RecipesListView from '../views/RecipesListView.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/addRecipe', component: AddRecipeView },
  { path: '/shoppingList', component: ShoppingListView },
  { path: '/recipes', component: RecipesListView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;