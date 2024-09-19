<template>
  <div>
    <button v-if="!isMenuOpen" @click="toggleMenu" class="p-2 text-white fixed top-2 left-2 z-50">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>

    <transition name="slide">
      <div v-if="isMenuOpen" class="fixed inset-0 z-40 flex">
        <div class="w-64 h-full bg-gray-800 p-4 shadow-lg">
          <ul class="space-y-4 text-white">
            <li v-if="isAuthenticated" class="text-center" @click="toggleMenu">
              <router-link to="/"
                class="w-full block p-2 rounded shadow-md hover:bg-emerald-400 transition-all duration-300" :class="{
                  'bg-emerald-500': isActiveRoute('/'),
                }">
                Home
              </router-link>
            </li>
            <li v-if="isAuthenticated" class="text-center" @click="toggleMenu">
              <router-link to="/test"
                class="w-full block p-2 rounded shadow-md hover:bg-emerald-400 transition-all duration-300" :class="{
                  'bg-emerald-500': isActiveRoute('/test'),
                }">
                Test
              </router-link>
            </li>
            <li v-if="!isAuthenticated" class="text-center" @click="toggleMenu">
              <router-link to="/auth"
                class="w-full block p-2 rounded shadow-md hover:bg-emerald-400 transition-all duration-300" :class="{
                  'bg-emerald-500': isActiveRoute('/auth'),
                }">
                Auth
              </router-link>
            </li>
            <li v-if="!isAuthenticated" class="text-center" @click="toggleMenu">
              <router-link to="/map"
                class="w-full block p-2 rounded shadow-md hover:bg-emerald-400 transition-all duration-300" :class="{
                  'bg-emerald-500': isActiveRoute('/map'),
                }">
                Map
              </router-link>
            </li>
          </ul>
        </div>
        <div @click="toggleMenu" class="flex-grow bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const isMenuOpen = ref(false);
const store = useStore();
const route = useRoute();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function isActiveRoute(path) {
  return route.path === path;
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.backdrop-blur-md {
  backdrop-filter: blur(10px);
}
</style>
