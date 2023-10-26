
<script>
import { LoginService } from '../services/LoginService';
import { reactiveStorage } from '../reativo/reactiveStorage';
    
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      senha: '',
      erro: ''
    };
  },
  methods: {
    async handleSubmit() {
        try{
            this.erro = '';
            let token = await new LoginService().login(this.email, this.senha);
            reactiveStorage.set("token", token);
            this.$router.push('/clientes');
        }
        catch(e){
            this.erro = e.message;
        }
    }
  }
}
</script>

<template>
    <header class="py-5">
        <div class="container px-5 pb-5">
            <div class="row gx-5 align-items-center">
                <div class="col-xxl-12">
                    <h3 class="card-title text-center">Login</h3>
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <label for="email">E-mail:</label>
                            <input type="email" class="form-control" id="email" v-model="email" required placeholder="Digite o seu email">
                        </div>
                        <div class="form-group">
                            <label for="password">Senha:</label>
                            <input type="password" class="form-control" id="password" v-model="senha" required placeholder="Digite a sua senha">
                        </div>

                        <div v-if="erro" class="alert alert-danger" role="alert">
                            {{ erro }}
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-block">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    </header>
</template>
  