import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '@/views/Register.vue'
import Reservation from '@/views/Reservation.vue'
import Calendar from '@/views/Calendar.vue'
import UserReservation from '@/views/UserReservation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/reservation',
      component: Reservation,
    },
    {
      path: '/user/reservation',
      component: UserReservation,
    },
    {
      path: '/calendar',
      component: Calendar,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/add-appointment',
      component: AddAppointment,
    },
    {
      path: '/list-appointment',
      component: ListAppointment,
    }

  ],
})

export default router
