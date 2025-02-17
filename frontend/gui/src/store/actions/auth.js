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

export const logout = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationtTime => {
    return dispatch =>{
        setTimeout(() =>{
            dispatch(logout());
        },expirationtTime * 1000)
    }
}

export const authLogin = (username,password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/',{
            username:username,
            password:password
        })
        .then(res => {
            const token = res.data.key;
            const expirationtDate = new Date(new Date().getDate() + 3600 * 1000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirationtDate',expirationtDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username,email,password1,password2) => {
    return dispatch =>{
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/signup/',{
            username:username,
            email:email,
            password1:password1,
            password2:password2
        })
        .then(res => {
            const token = res.data.key;
            const expirationtDate = new Date(new Date().getDate() + 3600 * 1000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirationtDate',expirationtDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(token === undefined){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date() ){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}