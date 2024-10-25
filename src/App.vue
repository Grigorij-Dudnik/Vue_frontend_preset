<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <div class="main-content">
    <RouterView />
  </div>
</template>

<style scoped>
.main-content {
  margin-top: 64px; /* Add top margin equal to the height of the header */
}
</style>
