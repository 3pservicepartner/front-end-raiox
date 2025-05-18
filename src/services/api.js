import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:8085', //'http://18.230.175.8:8085'  localhost
    withCredentials: true
})

export default api  