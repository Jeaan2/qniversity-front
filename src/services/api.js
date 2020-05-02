import axios from 'axios';

const api = axios.create({
    baseURL: 'https://qniversity-api.herokuapp.com/'
})

export default api;