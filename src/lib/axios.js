import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://showyourworkapi.jauharmuhammed.com/api',
})

export default instance