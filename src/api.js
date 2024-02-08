import store from './store'
import { createCookie, getCookie, deleteCookie } from './helpers'

const apiBase = process.env.REACT_APP_API_URL;

const defaultHeaders = new Headers();
defaultHeaders.append("Content-Type", "application/json");

class API {
    defaultHeaders;
    constructor(opts = {}) {
        const options = {
            responseType: 'json',
            ...opts,
        }

        this.defaultHeaders = defaultHeaders;
    }

    setAuthHeader(accessToken) {
        if(getCookie("accessToken")) {
            deleteCookie("accessToken");
        }
        createCookie("accessToken", accessToken, 1);
        // if(sessionStorage.getItem("accessToken")) {
        //     sessionStorage.removeItem("accessToken");
        // }
        // sessionStorage.setItem("accessToken", accessToken);
    }

    getHeaders() {
        // const accessToken = sessionStorage.getItem("accessToken");
        const accessToken = getCookie("accessToken");
        if(accessToken) {
            this.defaultHeaders.delete("x-access-token");
            this.defaultHeaders.append("x-access-token", accessToken);
        }
        return this.defaultHeaders;
    }

    clearToken() {
        this.defaultHeaders.delete("x-access-token");
        deleteCookie("accessToken");
        localStorage.clear();
        window.location.reload(false);
    }
}

const api = new API();

export default api;