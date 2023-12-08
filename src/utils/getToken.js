import {useState} from 'react';

export default function getToken() {
    const tokenString = localStorage.getItem('token');
    return JSON.parse(tokenString)
}