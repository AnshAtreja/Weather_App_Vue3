<template>
    <div class="text-center py-6">
        <img src="@/assets/images/appImage2.png" alt="Weather Icon" class="w-32 h-32 mx-auto" />
        <h1 class="text-3xl md:text-5xl font-bold mt-4 text-gray-800">Welcome {{ userName }} to Weather Application</h1>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const userName = computed(() => store.getters.getName || 'User');
console.log("Username is : ", userName.value)

</script>

<style scoped></style>