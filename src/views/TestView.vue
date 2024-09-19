<template>
    <div class="items-center">
        <p>Testing Component</p>
        <MapSearch />
        <button @click="logout" class="bg-red-500 text-white p-2 rounded w-full sm:w-auto shadow-md hover:bg-red-400">
            Logout
        </button>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { supabase } from '../utils/supabaseClient';
import MapSearch from '../components/MapSearchbar.vue'

const store = useStore();
const router = useRouter();

const logout = async () => {
  await supabase.auth.signOut();
  store.commit('setAuthenticated', false);
  store.commit('clearWeatherData');
  store.commit('setUserProfile', null)
  console.log("Logged out")
  router.push('/auth');
};

</script>

<style scoped></style>