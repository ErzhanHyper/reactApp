import {apiUrl} from "../config";
import getToken from '../utils/getToken'
import Emitter from "../utils/emitter";

export function store(id, params) {
    return fetch(apiUrl + '/eco-metrics/wastewater-calculations/'+id+'/wastewater', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
}

export function pdf(id) {
    return fetch(apiUrl + '/eco-metrics/wastewater-calculations/'+id+'/pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
        body: JSON.stringify({})
    })
        .then(res => res.blob())
}

export function list(id, params) {
    return fetch(apiUrl + '/eco-metrics/wastewater-calculations?' + new URLSearchParams(params), {
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

export function remove(id) {
    return fetch(apiUrl + '/eco-metrics/wastewater-calculations/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
    })
}

export function update(id, params) {
    return fetch(apiUrl + '/eco-metrics/wastewater-calculations/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
        body: JSON.stringify(params)
    }).then(res => res.json())

}