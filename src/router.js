// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/HomePage.vue';
import Clientes from './pages/clientes/ClientesPage.vue';
import ClienteForm from './pages/clientes/ClientesFormPage.vue';
import Pedidos from './pages/PedidosPage.vue';
import Login from './pages/LoginPage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/pedidos', component: Pedidos, meta: { autenticado: true } },
  { path: '/clientes', component: Clientes, meta: { autenticado: true } },
  { path: '/clientes/novo', component: ClienteForm, meta: { autenticado: true } },
  { path: '/clientes/:id/editar', component: ClienteForm, meta: { autenticado: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const logado = localStorage.getItem('token');
  if (to.matched.some(rota => rota.meta.autenticado) && !logado) {
    next('/login');
  } else {
    next();
  }
});

export default router;
