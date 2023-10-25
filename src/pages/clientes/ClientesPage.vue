<script>
    import { ClienteService } from '../../services/ClienteService.js'; // Importe o serviço

    export default {
        name: 'ClientesPage',
        data() {
            return {
                clientes: [], // Inicialize a lista de clientes como um array vazio
            };
        },
        methods: {
            async excluirCliente(id){
                if(confirm('Confirma?')){
                    try {
                        this.clientes = await new ClienteService().excluirPorId(id);
                        this.carregarClientes();
                    } catch (erro) {
                        alert('Erro ao carregar clientes: ' + erro.message);
                    }
                }
            },
            async carregarClientes() {
                try {
                    this.clientes = await new ClienteService().buscar();
                } catch (erro) {
                    alert('Erro ao carregar clientes:' + erro.message);
                }
            },
        },
        created() {
            this.carregarClientes();
        }
    }
</script>

<template>
    <header class="py-5">
        <div class="container px-5 pb-5">
            <div class="row gx-5 align-items-center">
                <div class="col-xxl-12">
                    <h1>Lista de clientes</h1>
                    <router-link to="/clientes/novo" class="btn btn-primary">
                        Novo
                    </router-link>
                    <hr>

                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Endereço</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cliente in clientes" :key="cliente.id">
                                <th scope="row">{{ cliente.id }}</th>
                                <td>{{ cliente.nome }}</td>
                                <td>{{ cliente.email }}</td>
                                <td>{{ cliente.telefone }}</td>
                                <td>{{ cliente.endereco }}</td>
                                <td>
                                    <router-link :to="'/clientes/' + cliente.id + '/editar'" class="btn btn-warning">Alterar</router-link>
                                </td>
                                <td>
                                    <a @click="excluirCliente(cliente.id)" class="btn btn-danger" href="#">Excluir</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </header>
</template>
  