<template>
  <div class="container mt-5">
    <h2 class="font-bold text-2xl text-center p-4">Gestion des paramètres</h2>
    <form v-if="params.length > 0" @submit.prevent = updateParameters() class="space-y-4 w-[20%] m-auto">
            <div class="mb-4">
              <label for="number" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de couverts</label>
              <input v-model="params[0].value" type="text" id="number" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="1" required>
            </div>
            <div class="mb-4">
              <label for="number" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Durée d'une réservation</label>
              <input v-model="params[1].value" type="text" id="number" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="1" required>
            </div>
            <div class="flex items-center justify-between mb-4">
            </div>
            <button class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Modifier les paramètres</button>
          </form>
    <h2 class="font-bold text-2xl text-center p-4">Gestion des réservations</h2>
    <div class="flex flex-row">
      <vue-cal class="vuecal--blue-theme w-[50%] h-[50%]"
      locale="fr"
      :events="reservations"
      :disable-views="['years', 'year']"
      @event-click="showEventDetails"
      :time="true"
      />
      <div v-if="selectedEvent" class="w-[40%] p-8">
        <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 class="font-bold text-xl text-center p-4">Modifier la réservation</h1>
          <p>
            Réservation du {{ new Date(selectedEvent.start).getDate() + " / " + new Date(selectedEvent.start).getMonth() + " / " + new Date(selectedEvent.start).getFullYear()}}
            à {{ new Date(selectedEvent.start).getHours() + "h" + new Date(selectedEvent.start).getMinutes()}}
          </p>
          <p class="mb-4">
            {{  selectedEvent.title }}
          </p>
          <form @submit.prevent = update() class="space-y-4">
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
            <button class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Modifier la réservation</button>
          </form>
          <button :onclick="deleteResa" class="w-full mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Supprimer la réservation</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import axios from "axios";
import { useRouter } from "vue-router";

const reservations = ref([]);
const params = ref([]);
const selectedEvent = ref(null);
const token = ref()
const router = useRouter()
const date = ref()
const number = ref()



const fetchReservations = async () => {
  try {
    const response = await axios.get("http://localhost:3000/reservation/all", {
      headers: {
        Authorization: token.value
      }});
      
      reservations.value = response.data.map((resa) => ({
        content: resa._id,
        title: "Nombre de couverts : " + resa.dinersNumber,
        start: new Date(resa.dateDebut),
        end: new Date(resa.dateFin)
      } 
      ));      
    } catch (error) {
      console.error("Erreur lors du chargement des rendez-vous", error);
    }
  };

const fetchParams = async () => {
  try {
    const response = await axios.get("http://localhost:3000/param/all", {
      headers: {
        Authorization: token.value
      }});
      
      params.value = response.data;      
    } catch (error) {
      console.error("Erreur lors du chargement des rendez-vous", error);
    }
  };
  
  const update = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(`http://localhost:3000/reservation/${selectedEvent.value.content}`, {
        date: date.value,
        dinersNumber: dinersNumber.value
      }, {
        headers: {
          Authorization: token
        }
      });
      
      fetchReservations()
    } catch (error) {
      console.error(error);
    }
  }
  
  const updateParameters = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(`http://localhost:3000/param/update`, {
        params: params.value
      }, {
        headers: {
          Authorization: token
        }
      });
      
      fetchReservations()
    } catch (error) {
      console.error(error);
    }
  }

  const deleteResa = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`http://localhost:3000/reservation/${selectedEvent.value.content}`, {
        headers: {
          Authorization: token
        }
      });
      
      fetchReservations()
    } catch (error) {
      console.error(error);
    }
  }
  
  const showEventDetails = (event) => {
    selectedEvent.value = event  
  };
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
  
  onMounted(async () => {
    console.log("in ?");
    token.value = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    
    if (role.includes("admin")) {      
      fetchReservations()
      fetchParams()
    } else {
      router.push({ path: '/login' })
    }
  });
</script>
