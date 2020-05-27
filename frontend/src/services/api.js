import axios from 'axios';


/// faz a conexão com o back end da aplicação
const api = axios.create({
        baseURL: 'http://localhost:3333',
})

export default api;
