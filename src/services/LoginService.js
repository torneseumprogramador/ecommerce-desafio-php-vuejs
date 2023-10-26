import { api } from '../config/api';

export class LoginService {
    async login(email, senha) {
        const login = {
          "email": email,
          "senha": senha
        }

        try {
            const response = await fetch(`${api.host}/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(login),
            });
        
            if (!response.ok) {
              const responseData = await response.json();
              if (responseData && responseData.mensagem) {
                throw new Error(responseData.mensagem);
              } else {
                throw new Error('Erro ao fazer login');
              }
            }
        
            let data = await response.json();

            return data.token;
        } catch (error) {
            console.error('Erro logar:', error);
            throw error;
        }
    }
  }
  