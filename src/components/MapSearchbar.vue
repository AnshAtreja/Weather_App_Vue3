<template>
  <div class="relative flex flex-col w-full max-w-md space-y-2">
    <div class="relative w-full">
      <input type="text" v-model="city" @input="fetchSuggestions" placeholder="Enter city name"
        class="border p-2 w-full shadow-md pr-10" />
      <button @click="clearInput"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <ul v-if="suggestions.length" class="bg-white border shadow-md mt-2 w-full">
      <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)"
        class="p-2 hover:bg-gray-200 cursor-pointer">
        {{ suggestion.name }}
      </li>
    </ul>
    <button @click="fetchWeather" :disabled="isLoading"
      class="bg-emerald-500 text-white p-2 rounded w-full sm:w-auto shadow-md hover:bg-emerald-400">
      Search
    </button>
  </div>
  <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const city = ref('');
const suggestions = computed(() => store.state.suggestions);
const errorMessage = computed(() => store.state.error);
const isLoading = computed(() => store.getters.isLoading);
const openWeatherAppId = import.meta.env.OPEN_WEATHER_APP_ID

const selectSuggestion = (suggestion) => {
    city.value = suggestion.display_name;
    store.commit('setCity', suggestion.display_name);
    store.commit('clearSuggestions');
};

const clearInput = () => {
    city.value = '';
    store.commit('clearSuggestions');
};

const fetchSuggestions = () => {
    store.dispatch('fetchSuggestions', city.value);
};

const fetchWeather = async () => {
  if (city.value.trim()) {
    try {
      console.log("Fetching data...");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${openWeatherAppId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      const { coord, weather } = data;
      console.log("Data is ", data)

      store.dispatch('updateWeatherData', [data]);
      
      store.dispatch('updateMapCenter', { coords: coord, weather });

      console.log("Weather data in store: ", store.getters.getWeatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
};
</script>

<style scoped>

</style>
