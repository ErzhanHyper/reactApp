import {
    Avatar, Box,
    Button, Card, CardActions, CardContent, Container,
    FormControl,
    TextField,
    Typography,
    Alert, AlertTitle
} from "@mui/material";

import '../styles/login.scss';
import React, {useState} from "react";
import PropTypes from "prop-types";
import {authUser} from "../actions/auth";
import LoadingButton from '@mui/lab/LoadingButton';

import LockIcon from '@mui/icons-material/LockOpen'
import {redirect, useNavigate} from "react-router-dom";

export default function Login({setToken}) {
    const history = useNavigate();

    const [login, setUserName] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [lock, setLock] = useState(false);

    const auth = async e => {
        setLoading(true)
        setLock(false)
        e.preventDefault();
        await authUser({
            login,
            password
        }).then(res => {
            if(res.token) {
                setToken(res.token);
                history('/wastewater')
            }else{
                setLock(true)
            }
        }).finally(() => {
            setLoading(false)
        });
    }

    const authKeyDown = e => {
        if (e.key === 'Enter') {
            auth(e)
        }
    }

    return (

        <Container className='loginForm' maxWidth="sm">
            <Card variant="outlined" sx={{mt: 10}}>
                <CardContent>
                    <Box sx={{textAlign: 'center'}}>
                        <Avatar sx={{margin: '0 auto'}}/>
                        <Typography component="h1" variant="h5">
                            Авторизация
                        </Typography>
                    </Box>
                    <form>
                        <FormControl margin="normal" required fullWidth>
                            <TextField label="Логин" variant="outlined" onChange={e => setUserName(e.target.value)} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField label="Пароль" variant="outlined" type={'password'}
                                       onChange={e => setPassword(e.target.value)}
                                       onKeyDown={authKeyDown}
                            />
                        </FormControl>
                    </form>

                </CardContent>

                <CardActions>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={auth}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<LockIcon/>}
                    >
                        Войти
                    </LoadingButton>
                </CardActions>

                {lock &&
                <Alert severity="error">
                    <AlertTitle>Ошибка входа</AlertTitle>
                    Неправильные данные — <strong>для авторизации!</strong>
                </Alert>}

            </Card>
        </Container>

    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};