import { Cliente } from '../entities/Cliente';
import { api } from '../config/api';

export class ClienteService {
    async buscar() {
        try {
            const response = await fetch(`${api.host}/clientes`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
              }
            });
        
            if (!response.ok) {
              const responseData = await response.json();
              if (responseData && responseData.mensagem) {
                throw new Error(responseData.mensagem);
              } else {
                throw new Error('Erro ao buscar o cliente');
              }
            }
        
            let clientesJson = await response.json();

            let clientesTipado = [];

            clientesJson.forEach(clienteJson => {
                clientesTipado.push(new Cliente(clienteJson));
            });

            return clientesTipado;
        } catch (error) {
            console.error('Erro ao buscar o cliente:', error);
            throw error;
        }
    }

    async buscarPorId(id) {
      try {
          const response = await fetch(`${api.host}/clientes/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          });
      
          if (!response.ok) {
            const responseData = await response.json();
            if (responseData && responseData.mensagem) {
              throw new Error(responseData.mensagem);
            } else {
              throw new Error('Erro ao buscar o cliente');
            }
          }
      
          let clienteJson = await response.json();
          return new Cliente(clienteJson);
      } catch (error) {
          console.error('Erro ao buscar o cliente:', error);
          throw error;
      }
    }

    async excluirPorId(id) {
      try {
          const response = await fetch(`${api.host}/clientes/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          });
      
          if (!response.ok) {
            const responseData = await response.json();
            if (responseData && responseData.mensagem) {
              throw new Error(responseData.mensagem);
            } else {
              throw new Error('Erro ao excluir o cliente');
            }
          }
      } catch (error) {
          console.error('Erro ao excluir o cliente:', error);
          throw error;
      }
    }

    async salvar(cliente) {
      if(!cliente.id){
        try {
          const response = await fetch(`${api.host}/clientes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(cliente),
          });
    
          if (!response.ok) {
            const responseData = await response.json();
            if (responseData && responseData.mensagem) {
              throw new Error(responseData.mensagem);
            } else {
              throw new Error('Erro ao salvar o cliente');
            }
          }
    
          let clienteJson = await response.json();
          return new Cliente(clienteJson);
        } catch (error) {
          console.error('Erro ao salvar o cliente:', error);
          throw error;
        }
      }
      else{
        try {
          const response = await fetch(`${api.host}/clientes/${cliente.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(cliente),
          });
    
          if (!response.ok) {
            const responseData = await response.json();
            if (responseData && responseData.mensagem) {
              throw new Error(responseData.mensagem);
            } else {
              throw new Error('Erro ao salvar o cliente');
            }
          }
    
          let clienteJson = await response.json();
          return new Cliente(clienteJson);
        } catch (error) {
          console.error('Erro ao salvar o cliente:', error);
          throw error;
        }
      }
    }
  }
  