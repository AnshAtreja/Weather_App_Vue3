<template>
    <div class="max-w-md mx-auto p-4">
        <h2 class="text-2xl mb-4 text-center">Login</h2>
        <form @submit.prevent="login">
            <div class="mb-4">
                <input v-model="email" type="email" placeholder="Email" required class="border p-2 w-full" />
            </div>
            <div class="mb-4">
                <input v-model="password" type="password" placeholder="Password" required class="border p-2 w-full" />
            </div>
            <button type="submit"
                class="bg-emerald-500 text-white p-2 rounded w-full sm:w-auto shadow-md hover:bg-emerald-400">Login</button>
        </form>
        <button @click="toggleForm" class="mt-4 text-blue-500">Not a user? Sign Up</button>
        <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();

const emit = defineEmits(['toggle-signup']);
const router = useRouter();

const toggleForm = () => {
    emit('toggle-signup');
};

const email = ref('')
const password = ref('')
const errorMessage = ref('');

const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })
    if (error) {
        console.error(error)
        errorMessage.value = error.message;
    }
    else {
        console.log("Data: ", data)
        const profile = data.user.user_metadata.display_name
        console.log(profile)
        store.commit('setUserProfile', profile);
        store.commit('setAuthenticated', true);
        router.push('/')
    }
}

const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
        errorMessage.value = error.message;
    } 
    else {
        console.log("User : ", data)
        router.push('/')
    }
}

</script>

<style scoped></style>
