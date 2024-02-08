import { userActions } from "../slices/user";
import api from "../../api";

const { loginSuccess, logoutSuccess } = userActions;
const apiBase = process.env.REACT_APP_API_URL;

export const login = ({ username, password }) => async dispatch => {
    try {
        let myHeaders = api.getHeaders();
        let raw = JSON.stringify({
            "username": username,
            "password": password
          });
        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        const res = await fetch(`${apiBase}/auth/signin`, requestOptions);
        const result = await res.text();
        const data = JSON.parse(result);
        api.setAuthHeader(data.accessToken);
        dispatch(loginSuccess(data))
    } catch(err) {
        console.error(err);
    }
}

export const signup = ({ username, firstName, lastName, email, password }) => async dispatch => {
    try {
        let myHeaders = api.getHeaders();
        let raw = JSON.stringify({
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "role": ["user"]
          });
        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        const res = await fetch(`${apiBase}/auth/signup`, requestOptions);
        const result = await res.text();
        const data = JSON.parse(result);
        console.log(res, data);
        dispatch(login({username, password}));
    } catch(err) {
        console.error(err);
    }
}

export const logout = () => async dispatch => {
    // try {
    //     const res = await fetch(`${apiBase}/auth/logout`, {
    //         method: "POST",
    //         body: {
    //             username,
    //             password
    //         }
    //     });
    //     console.log(res);
    //     dispatch(loginReducer)
    // } catch(err) {
    //     console.error(err);
    // }
    api.clearToken();
    dispatch(logoutSuccess)
}