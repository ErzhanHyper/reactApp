import {apiUrl} from "../config";
import getToken from '../utils/getToken'
import Emitter from "../utils/emitter";

export function list(credentials) {
    return fetch(apiUrl + '/reference/mrps?' + new URLSearchParams(credentials), {
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

export function store(params) {
    return fetch(apiUrl + '/reference/mrps', {
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
    return fetch(apiUrl + '/reference/mrps/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
    })
}