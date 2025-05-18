import axios from "axios"

const api = axios.create({
    baseURL: 'https://www.raiox3p.site', //'https://www.raiox3p.site'  localhost
    withCredentials: true
})

export default api  