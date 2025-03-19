import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import CentrosView from '@/views/CentrosView.vue'
import CitasView from '@/views/CitasView.vue'
import PerfilView from '@/views/PerfilView.vue'

import { useCounterStore } from '@/stores/counter'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/dashboard', component: DashboardView },
  { path: '/centros', component: CentrosView },
  { path: '/citas', component: CitasView },
  { path: '/perfil', component: PerfilView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const rutasProtegidasConInactividad = ['/dashboard', '/citas', '/perfil','/centros' ]

router.beforeEach((to, from, next) => {
  const store = useCounterStore()

  if (rutasProtegidasConInactividad.includes(to.path)) {
    store.startInactivityTimer(router)
  } else {
    store.stopInactivityTimer()
  }

  next()
})

export default router
