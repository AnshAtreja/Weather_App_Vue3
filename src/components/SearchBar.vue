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
                {{ suggestion.display_name }}
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

const fetchWeather = () => {
    if (!city.value.trim()) {
        store.commit('setError', 'Please enter a value');
    } else {
        store.commit('setError', null);
        store.commit('setCity', city.value);
        store.commit('clearSuggestions');
        // store.dispatch('fetchWeatherMock');
        store.dispatch('fetchWeather');
    }
};

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
</script>

<style scoped></style>