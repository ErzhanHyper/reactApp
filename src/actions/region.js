import {apiUrl} from "../config";
const token = JSON.parse(localStorage.getItem('token'))
import getToken from '../utils/getToken'
import Emitter from "../utils/emitter";

export function list(params) {
    return fetch(apiUrl + '/reference/regions?' + new URLSearchParams(params), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
    })
        .then(res => res.json())
        .then(data => data['hydra:member'])
        .finally(() => {
            Emitter.emit('RUN_PROGRESS_BAR', false);
        })
}

export function get(id) {
    return fetch(apiUrl + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
    })
        .then(res => res.json())
}

export function store(params) {
    return fetch(apiUrl + '/reference/regions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
}

export function remove(id) {
    return fetch(apiUrl + '/reference/regions/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
    })
}