import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin) {

    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:${isLogin ? `signInWithPassword` : `signUp`}?key=AIzaSyDMAYQrcO2Ps2LM2f8zUQBFYUch_zrII0g`
        const response = await axios.post(url, authData);
        const data = response.data;
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
        console.log(new Date().getTime(), expirationDate);
        localStorage.setItem(`token`, data.idToken)
        localStorage.setItem(`userId`, data.localId);
        localStorage.setItem(`expirationDate`, expirationDate);

        dispatch(authSuccess(data.idToken));
        dispatch(autoLogout(data.expiresIn));

    }
}

function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem(`token`);
        console.log(token);
        if (!token){
            dispatch(logout());
        } else {
          const expirationDate = new Date(localStorage.getItem(`expirationDate`));
          console.log(expirationDate, new Date())
          if (expirationDate <= new Date()){
              dispatch(logout());
          } else {
              dispatch(authSuccess(token));
              dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

export function logout() {
    localStorage.removeItem(`token`)
    localStorage.removeItem(`userId`);
    localStorage.removeItem(`expirationDate`);
    return {
        type: AUTH_LOGOUT
    }
}

function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}
