<template>
  <!-- <div class="bg-green-100 min-h-screen flex flex-col lg:flex-row" :style="backgroundImageStyle"> -->
  <div class="min-h-screen flex flex-col bg-gradient-to-r from-green-200 via-green-300 to-green-400">
    <Navbar />
    <div class="flex-col flex-grow lg:ml-64">
        <router-view />
      </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import 'weather-icons/css/weather-icons.css';
// import { ref } from 'vue';

// const backgroundImage = new URL('@/assets/images/background.jpg', import.meta.url);
// const backgroundImageStyle = ref({
//   backgroundImage: `url(${backgroundImage})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
// });

</script>

<style scoped>

</style>