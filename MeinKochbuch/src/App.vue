<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div id="app">
  <Navbar></Navbar>
  <header>
    <div class="wrapper">
    </div>
  </header>
    </div>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

#background{
background-color: #f0f0f0;
}
</style>
