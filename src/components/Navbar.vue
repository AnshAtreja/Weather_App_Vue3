<template>
  <div>
    <div v-if="isLargeScreen">
      <nav class="fixed left-0 top-0 h-full w-64 bg-gray-800 p-4 shadow-lg">
        <ul class="space-y-4">
          <li v-if="isAuthenticated" class="text-center">
            <router-link
              to="/"
              class="w-full block text-white p-2 rounded shadow-md hover:bg-emerald-400 transition-all duration-300"
              :class="{
                'bg-emerald-500': isActiveRoute('/'),
              }"
            >
              Home
            </router-link>
          </li>
          <li v-if="isAuthenticated" class="text-center">
            <router-link
              to="/test"
              class="w-full block text-white p-2 rounded shadow-md hover:bg-emerald-400 transition-all duration-300"
              :class="{
                'bg-emerald-500': isActiveRoute('/test'),
              }"
            >
              Test
            </router-link>
          </li>
          <li v-if="!isAuthenticated" class="text-center">
            <router-link
              to="/auth"
              class="w-full block text-white p-2 rounded shadow-md hover:bg-emerald-400 transition-all duration-300"
              :class="{
                'bg-emerald-500': isActiveRoute('/auth'),
              }"
            >
              Auth
            </router-link>
          </li>
          <li v-if="!isAuthenticated" class="text-center">
            <router-link
              to="/map"
              class="w-full block text-white p-2 rounded shadow-md hover:bg-emerald-400 transition-all duration-300"
              :class="{
                'bg-emerald-500': isActiveRoute('/map'),
              }"
            >
              Map
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div v-else>
      <HamburgerMenu />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import HamburgerMenu from './HamburgerMenu.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const screenWidth = ref(window.innerWidth);
const breakpoints = {
  lg: 1024,
};

const isLargeScreen = computed(() => screenWidth.value >= breakpoints.lg);

function handleResize() {
  screenWidth.value = window.innerWidth;
}

function isActiveRoute(path) {
  return route.path === path;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
