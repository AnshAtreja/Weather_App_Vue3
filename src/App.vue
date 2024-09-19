<template>
    <div class="bg-green-100 min-h-screen" :style="backgroundImageStyle">
        <router-view></router-view>
    </div>
</template>

<script setup>
import 'weather-icons/css/weather-icons.css';
import { ref } from 'vue';

const backgroundImage = new URL('@/assets/images/background.jpg', import.meta.url);
const backgroundImageStyle = ref({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center', 
});
</script>

<style scoped>

</style>
