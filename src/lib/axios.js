import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://showyourworkapi.jauharmuhammed.com/api',
})

export default instance