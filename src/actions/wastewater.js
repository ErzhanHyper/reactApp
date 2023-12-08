import {apiUrl} from "../config";
import getToken from '../utils/getToken'
import Emitter from "../utils/emitter";

export function store(params) {
    return fetch(apiUrl + '/eco-metrics/wastewater-calculations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
}

export function list(id, params) {
    return fetch(apiUrl + '/eco-metrics/wastewater-calculations/'+id+'/wastewater?' + new URLSearchParams(params), {
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
    return fetch(apiUrl + '/eco-metrics/wastewater-calculations/'+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
    })
        .then(res => res.json())
}

export function remove(wastewaterCalculationId, id) {
    return fetch(apiUrl + '/eco-metrics/wastewater-calculations/'+wastewaterCalculationId+'/wastewater/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getToken()
        },
    })
}