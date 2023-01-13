import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://showyourwork.up.railway.app/api',
})

export default instance