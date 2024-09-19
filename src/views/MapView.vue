<template>
    <div class="relative min-h-screen flex flex-col items-center">
      <div class="w-full max-w-md flex justify-center p-4">
        <MapSearchbar />
      </div>
  
      <div class="flex-grow w-full max-w-4xl p-4">
        <Map ref="mapComponent" />
      </div>
    </div>
  </template>

<script setup>
import Map from '../components/Map.vue'
import MapSearchbar from '../components/MapSearchbar.vue'
import { ref } from 'vue';

const mapComponent = ref(null);

</script>

<style lang="scss" scoped></style>