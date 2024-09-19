<template>
  <transition>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" v-if="isOpen"
      @click.self="closeModal">
      <div class="modal-content bg-white p-6 rounded-lg shadow-lg relative">
        <button class="absolute top-2 right-2 text-gray-700 hover:text-gray-900" @click="closeModal">
          ✖
        </button>
        <div class="flex items-center space-x-4">
          <img :src="iconUrl" alt="Weather Icon" class="w-16 h-16" />
          <div>
            <h2 class="text-lg font-bold">{{ cityName }}</h2>
            <p><strong>Condition:</strong> {{ weatherMain }}</p>
            <p><strong>Temperature:</strong> {{ temperature }}</p>
            <p><strong>Humidity:</strong> {{ humidity }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  weatherData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

const iconUrl = computed(
  () => `https://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}@2x.png`
);
const cityName = computed(() => props.weatherData.name || 'City');
const weatherMain = computed(
  () => props.weatherData.weather[0].main || 'Not found'
);
const temperature = computed(() => props.weatherData?.main?.temp + "°C" || 'Not found'); 
const humidity = computed(() => props.weatherData.main?.humidity + "%" || 'Not found');

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal-content {
  max-width: 400px;
  width: 100%;
  margin: 0 16px;
  padding: 24px;
}

@media (max-width: 600px) {
  .modal-content {
    max-width: 90%;
    padding: 15px;
  }
}
</style>
