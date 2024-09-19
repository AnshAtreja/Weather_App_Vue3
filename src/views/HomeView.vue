<template>
    <div class="flex flex-col items-center p-4">
        <AppHeader />
        <SearchBar />
        <div v-if="isLoading" class="spinner-container">
            <div class="spinner"></div>
        </div>
        <WeatherDetails v-if="!isLoading && weatherData" class="mt-8 w-full max-w-md" />
        <HourlyWeather v-if="!isLoading && weatherData" />
    </div>
</template>

<script setup>
import SearchBar from '../components/SearchBar.vue';
import WeatherDetails from '../components/WeatherDetails.vue';
import HourlyWeather from '../components/HourlyWeather.vue';
import AppHeader from '../components/AppHeader.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isLoading = computed(() => store.getters.isLoading);
const weatherData = computed(() => store.getters.getWeatherData);

</script>

<style scoped>
.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
}

.spinner {
    border: 9px solid rgba(0, 0, 0, 0.1);
    border-top: 9px solid #34db5b;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 0.7s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>