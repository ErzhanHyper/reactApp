import {apiUrl} from "../config";

import {redirect} from "react-router-dom";
import getToken from '../utils/getToken'
import Emitter from "../utils/emitter";

export function authUser(credentials) {

    return fetch(apiUrl + '/authentication-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
        .catch(() => {
            redirect("/login");
        })
}


export function getUser() {
    return fetch(apiUrl + '/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
    })
        .then(res => res.json())
}