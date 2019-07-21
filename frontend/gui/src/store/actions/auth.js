import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type:actionTypes.AUTH_SUCESS,
        token:token
    }
}

export const authFail = error => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const authLogin = (username,password) => {
    return dispath =>{
        dispath(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/',{
            username:username,
            password:password
        })
        .then(res => {
            const token = res.data.key;
            const expirationtDate = new Date(new Date().getDate() + 3600 * 1000)
            localStorage.setItem('token',token);
            localStorage.setItem('expirationtDate',expirationtDate);
        })
    }
}

