<script setup>
// import { defineProps, withDefaults } from 'vue';
// import { RouterView } from 'vue-router';
// import Home from './views/Home.vue';
import Header from './components/Header.vue';
</script>

<template>
  <header>
    <Header />
  </header>

  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>