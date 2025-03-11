import { createRouter, createWebHistory } from 'vue-router';
import RegistroView from '@/views/RegistroView.vue';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue'; 
import DashboardView from '@/views/DashboardView.vue';
import CentrosView from '@/views/CentrosView.vue' 
import CitasView from '@/views/CitasView.vue'     
import PerfilView from '@/views/PerfilView.vue'   

const routes = [
  { path: '/', component: HomeView },
  { path: '/registro', component: RegistroView },
  { path: '/login', component: LoginView },
  { path: '/dashboard', component: DashboardView },
  { path: '/centros', component: CentrosView },
  { path: '/date', component: CitasView },
  { path: '/perfil', component: PerfilView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
