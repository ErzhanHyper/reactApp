import {useEffect, useState} from 'react';
import {getUser} from "../actions/auth";

export default function useToken() {

    const [authenticated, setAuthenticated] = useState(false);

    const checkUser = async () => {
        await getUser().then(res => {
            if (res.code === 401) {
                setAuthenticated(false)
                removeToken()
            }
            setAuthenticated(true)
        })
    }

    useEffect(() => {
        checkUser()
    }, [])

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        return JSON.parse(tokenString)
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    const removeToken = () => {
        localStorage.removeItem('token');
    }

    return {
        setToken: saveToken,
        token
    }
}