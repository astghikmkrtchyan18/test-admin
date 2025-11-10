import axios from 'axios'
import { CONFIG } from '../config'

export const http = axios.create({
    baseURL: CONFIG.API_URL,
    headers: { 'Content-Type': 'application/json' },
});
