import axios from 'axios';
import { USER_LOCALSORAGE_KEY } from 'shared/const/localstorage';

export const $api = axios.create({
    baseURL: __API__,
    headers: {
        authorization: localStorage.getItem(USER_LOCALSORAGE_KEY) || '',
    },
})
