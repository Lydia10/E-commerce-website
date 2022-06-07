import axios from 'axios';

const BASE__URL = "http://localhost:3002/api/";

export const publicRequest = axios.create({
    baseURL: BASE__URL,
});
