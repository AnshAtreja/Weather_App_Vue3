<template>
  <div id="map" class="h-screen w-full rounded-[20px] drop-shadow-xl"></div>
  <WeatherModal v-if="isModalOpen" :weatherData="selectedWeatherData" :isOpen="isModalOpen" @close="closeModal"
    @clickOutside="closeModal" />
</template>

<script setup>
import { ref, onMounted, watch} from 'vue';
import { useStore } from 'vuex'
import mapboxgl from 'mapbox-gl';
import WeatherModal from './WeatherModal.vue';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5zaDIwMDIiLCJhIjoiY20wNTYweW9vMDhpNDJrczlhdjRrbG9iaiJ9.xzYg_JNySLQ4oGTTtJnLEQ';

const store = useStore();
const isModalOpen = ref(false);
const selectedWeatherData = ref(null);
const map = ref(null);

watch(
  () => store.state.mapCenter,
  (newCenter) => {
    if (map.value) {
      map.value.setCenter(newCenter);
      map.value.setZoom(10); 
    }
  }
);

watch(
  () => store.getters.getWeatherData, 
  (weatherData) => {
    if (map.value && weatherData) {
      console.log("Weather data is :", weatherData);

      weatherData.forEach((cityWeather) => {
        const { coord , weather } = cityWeather;
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

        new mapboxgl.Marker({
          element: createCustomMarker(iconUrl, cityWeather),
          anchor: 'bottom'
        })
          .setLngLat([coord.lon, coord.lat])
          .addTo(map.value);
      });
    }
  }
);

const cityIds = [
  1275339, // Mumbai
  1261481, // New Delhi
  1273294, // Bangalore
  1277333, // Chennai
  1264527, // Ahmedabad
];

async function fetchWeatherData() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/group?id=${cityIds.join(',')}&units=metric&appid=519a7a8b0afd2371b7d8f251292b4afa`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.list;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return [];
  }
}

async function fetchWeatherMock() {
  try {
    const response = await fetch('/exampleResponse4.json');

    if (!response.ok) {
      throw new Error('Failed to fetch mock data');
    }

    const data = await response.json();
    return data.list;
  } catch (error) {
    console.error('Error fetching mock weather data:', error);
    return [];
  }
}

const createCustomMarker = (iconUrl, cityWeather) => {
  const el = document.createElement('div');
  el.className = 'weather-marker';
  el.style.backgroundImage = `url(${iconUrl})`;
  el.style.width = '50px';
  el.style.height = '50px';
  el.style.backgroundSize = 'contain';
  el.style.backgroundRepeat = 'no-repeat';
  el.style.cursor = 'pointer';

  el.addEventListener('click', () => {
    console.log("Clicked...")
    openModal(cityWeather);
  });

  return el;
}

const openModal = (weatherData) => {
  selectedWeatherData.value = weatherData;
  isModalOpen.value = true;
}

const closeModal = () => {
  isModalOpen.value = false;
  selectedWeatherData.value = null;
}

onMounted(async () => {
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: [78.9629, 20.5937],
    zoom: 4
  });

  // const weatherData = await fetchWeatherData();
  const weatherData = await fetchWeatherMock();

  weatherData.forEach((cityWeather) => {
    const { coord: { lon, lat }, weather } = cityWeather;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    new mapboxgl.Marker({
      element: createCustomMarker(iconUrl, cityWeather),
      anchor: 'bottom'
    })
      .setLngLat([lon, lat])
      .addTo(map.value);

    // console.log("Marker added for:", weather[0].icon, "and", cityWeather.name);
  });
});

</script>

<style scoped>

</style>
