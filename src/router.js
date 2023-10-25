// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/HomePage.vue';
import Clientes from './pages/clientes/ClientesPage.vue';
import ClienteForm from './pages/clientes/ClientesFormPage.vue';
import Pedidos from './pages/PedidosPage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/pedidos', component: Pedidos },
  { path: '/clientes', component: Clientes },
  { path: '/clientes/novo', component: ClienteForm },
  { path: '/clientes/:id/editar', component: ClienteForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
