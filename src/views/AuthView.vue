<template>
    <div>
        <SignUp v-if="isSignUp" @toggle-login="toggleAuthForm" />
        <Login v-else @toggle-signup="toggleAuthForm" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SignUp from '../components/Signup.vue'
import Login from '../components/Login.vue'

const isSignUp = ref(false)

const toggleAuthForm = () => {
    isSignUp.value = !isSignUp.value
}

</script>

<style scoped></style>