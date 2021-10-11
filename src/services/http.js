import axios from 'axios';
import store from '../store';
import { userActions } from '../actions';
import { apiConstants } from '../constants';

const http = axios.create({
    baseURL: apiConstants.API_URL,
    withCredentials: true
})

http.interceptors.response.use(
    res => Promise.resolve(res), 
    error => {
        if (error.response && error.response.status === 401) {
            store.dispatch(userActions.logout());
        }
        return Promise.reject(error);
    }
);

export default http;
