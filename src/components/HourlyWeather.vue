<template>
    <div v-if="hourlyData.length > 0" class="p-4 border rounded shadow mt-8">
        <h2 class="text-2xl font-bold mb-4 text-center">Hourly Data</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="hour in hourlyData" :key="hour.datetime" class="p-4 border rounded shadow text-center bg-white">
                <p class="font-semibold">{{ formatHour(hour.datetime, dayDate) }}</p>
                <i :class="getWeatherIcon(hour.icon)" class="text-2xl"></i> 
                <p>Temp: {{ convertFtoC(hour.temp).toFixed(1) }}°C</p>
                <p>Conditions: {{ hour.conditions }}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <p>No Hourly Data Available</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { formatHour, convertFtoC, getWeatherIcon } from '../utils';

const store = useStore();
const weatherData = computed(() => store.getters.getWeatherData);
const hourlyData = computed(() => weatherData.value?.days[0]?.hours || []);
const dayDate = computed(() => weatherData.value?.days[0]?.datetime || '');
</script>

<style scoped></style>