import axios from 'axios'
import {constants}  from './configurations/constants'

const instance = axios.create({
    baseURL:constants.devURL,
});

export default instance
