
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');



const login = async () => {
    try {
        const response = await axios.post('http://localhost:3000/user/login', {
            email: email.value,
            password: password.value
        });
		console.log(response.data);
        console.log("ok");
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.currentUser.role);

    } catch (error) {
        console.error(error);
    }
    
    
        
}


</script>

<template>
    <div class="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
	<div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
		<h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Bon retour parmi nous !</h1>
		<form @submit.prevent = login() class="space-y-4">
			<div class="mb-4">
				<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
				<input v-model="email" type="email" id="email" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required>
			</div>
			<div class="mb-4">
<<<<<<< HEAD
				<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mot de passe</label>
				<input v-model="password" type="password" id="password" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Votre mot de passe" required>
			</div>
			<div class="flex items-center justify-between mb-4">
			
=======
				<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
				<input v-model="password" type="password" id="password" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required>
			</div>
			<div class="flex items-center justify-between mb-4">
			
				<a href="/register"
					class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create
					Account</a>
>>>>>>> 41c485204f5f0565c69f5eb666d79341cac3219e
			</div>
			<button class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
		</form>
	</div>
</div>
</template>