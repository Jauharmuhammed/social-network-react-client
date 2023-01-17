import axios from 'axios'
import { baseUrl } from './constants'

const instance = axios.create({
    baseURL: `${baseUrl}/api`,
})

export default instance