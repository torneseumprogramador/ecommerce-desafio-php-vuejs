<script>
    import { ClienteService } from '../../services/ClienteService'; // Importe o serviço
    import { Cliente } from '../../entities/Cliente'; // Importe o serviço

    export default {
        name: 'ClientesFormPage',
        data() {
            return {
                cliente: new Cliente(),
                erro: null,
            };
        },
        methods: {
            async carregarCliente() {
                try {
                    let id = this.$route.params.id;
                    if (id) {
                        this.cliente = await new ClienteService().buscarPorId(id);
                    }
                } catch (erro) {
                    alert('Erro ao carregar clientes:' + erro.message);
                }
            },
            async salvarCliente() {
                try {
                    await new ClienteService().salvar(this.cliente);
                    this.$router.push('/clientes');
                } catch (erro) {
                    this.erro = 'Erro ao salvar cliente: ' + erro.message;
                }
            },
        },
        created() {
            this.carregarCliente();
        }
    }
</script>

<template>
    <header class="py-5">
        <div class="container px-5 pb-5">
            <div class="row gx-5 align-items-center">
                <div class="col-xxl-12">
                    <h1>{{ cliente.id ? `Edição do ${cliente.nome}` : "Novo cliente" }}</h1>
                    <hr>

                    <div v-if="erro" class="alert alert-danger" role="alert">
                        {{ erro }}
                    </div>

                    <form @submit.prevent="salvarCliente">
                        <div class="form-group">
                            <label for="nome">Nome:</label>
                            <input type="text" class="form-control" id="nome" v-model="cliente.nome" placeholder="Seu nome">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" v-model="cliente.email" placeholder="Seu email">
                        </div>
                        <div class="form-group">
                            <label for="telefone">Telefone</label>
                            <input type="tel" class="form-control" id="telefone" v-model="cliente.telefone" placeholder="Seu telefone">
                        </div>
                        <div class="form-group">
                            <label for="endereco">Endereço</label>
                            <input type="text" class="form-control" id="endereco" v-model="cliente.endereco" placeholder="Seu endereço">
                        </div>
                        <button type="submit" class="btn btn-primary">Enviar</button>
                        <router-link to="/clientes" class="btn btn-default">Lista de clientes</router-link>
                    </form>
                </div>
            </div>
        </div>
    </header>
</template>
  