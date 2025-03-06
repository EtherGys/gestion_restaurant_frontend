
<script setup>
import { ref } from 'vue';
import axios from 'axios';


const date = ref();
const dinersNumber = ref('');


const add = async () => {

	const token = localStorage.getItem("token");
	
    try {
			const response = await axios.post('http://localhost:3000/reservation/create', {
				date: date.value,
				dinersNumber: dinersNumber.value
			}, {
				headers: {
					Authorization: token
				}
			});
    } catch (error) {
        console.error(error);
    }
    
    
        
}


</script>

<template>
    <div class="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
	<div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
		<form @submit.prevent = add() class="space-y-4">
			<div class="mb-4">
				<label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
				<input v-model="date" type="datetime-local" id="date" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"  required>
			</div>
            <div class="mb-4">
				<label for="dinersNumber" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de couverts</label>
				<input v-model="dinersNumber" type="number" id="dinersNumber" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="1" required>
			</div>
			<div class="flex items-center justify-between mb-4">
			</div>
			<button class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Envoyer la demande</button>
		</form>
	</div>
</div>
</template>