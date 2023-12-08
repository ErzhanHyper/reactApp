import {apiUrl} from "../config";
import getToken from '../utils/getToken'
import Emitter from "../utils/emitter";

export function list(params) {
    return fetch(apiUrl + '/reference/pollutants?' + new URLSearchParams(params), {
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
    return fetch(apiUrl + '/reference/pollutants', {
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
    return fetch(apiUrl + '/reference/pollutants/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
    })
}