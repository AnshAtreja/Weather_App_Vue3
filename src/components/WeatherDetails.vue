<template>
    <div v-if="weatherData" class="p-4 border rounded shadow w-full max-w-md text-center bg-white">
        <h2 class="text-2xl font-bold">{{ weatherData.resolvedAddress }}</h2>
        <p class="text-sm text-gray-500">{{ formattedDate }}</p>
        <i :class="getWeatherIcon(weatherData.days[0].icon)" class="text-4xl mt-2"></i> 
        <p class="mt-2">Min Temperature: {{ convertFtoC(weatherData.days[0].tempmin).toFixed(1) }}°C</p>
        <p>Max Temperature: {{ convertFtoC(weatherData.days[0].tempmax).toFixed(1) }}°C</p>
        <p>Current Temperature: {{ convertFtoC(weatherData.days[0].temp).toFixed(1) }}°C</p>
        <p class="mt-4">{{ description }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { formatDate, combineDescription, convertFtoC, getWeatherIcon } from '../utils';

const store = useStore();
const weatherData = computed(() => store.getters.getWeatherData);

const formattedDate = computed(() => {
    return weatherData.value ? formatDate(weatherData.value.days[0].datetime) : '';
});

const description = computed(() => {
    return weatherData.value
        ? combineDescription(weatherData.value.days[0].conditions, weatherData.value.days[0].description)
        : '';
});
</script>

<style scoped>
</style>