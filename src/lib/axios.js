import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://showyourwork.jauharmuhammed.com/api',
})

export default instance