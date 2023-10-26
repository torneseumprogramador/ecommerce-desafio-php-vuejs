<template>
    <main class="flex-shrink-0">
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
            <div class="container px-5">
                <router-link to="/" class="navbar-brand">
                    <span class="fw-bolder text-primary">Desafio de PHP com
                        Slim</span>
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                        <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
                        <li v-if="!logado" class="nav-item"><router-link class="nav-link" to="/login">Login</router-link></li>
                        <li v-if="logado" class="nav-item"><router-link class="nav-link" to="/pedidos">Pedidos</router-link></li>
                        <li v-if="logado" class="nav-item"><router-link class="nav-link" to="/clientes">Clientes</router-link></li>
                        <li v-if="logado" class="nav-item"><a class="nav-link" href="#" @click="sair()" >Sair</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </main>
</template>
  
<script>
import { reactiveStorage } from '../reativo/reactiveStorage';

export default {
  name: 'MenuComponent',
  data() {
    return {
        logado: false
    }
  },
  methods: {
    sair(){
        if(confirm("Confirma ?")){
            reactiveStorage.clear();
            this.$router.push('/login');
        }
    },
    handleStorageChange() {
      this.logado = reactiveStorage.get("token") != null;
    }
  },
  created() {
    this.logado = reactiveStorage.get("token") != null;
    window.addEventListener('storage', this.handleStorageChange);
  },
  unmounted() {
    this.logado = reactiveStorage.get("token") != null;
    window.removeEventListener('storage', this.handleStorageChange);
  }
}
</script>