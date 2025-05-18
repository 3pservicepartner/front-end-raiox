import axios from "axios"

const api = axios.create({
    baseURL: 'http://56.125.31.77:8085', //'http://56.125.31.77:8085'  localhost
    withCredentials: true
})

export default api  