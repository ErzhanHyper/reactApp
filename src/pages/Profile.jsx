import React, {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {getUser} from "../actions/auth";
import {redirect} from "react-router-dom";
import Emitter from "../utils/emitter";

export default function Profile() {
    const [login, setLogin] = useState();

    const checkUser = () => {
        getUser().then(res => {
            setLogin(res.login)
            Emitter.emit('RUN_PROGRESS_BAR', false);
        })
    }

    useEffect(() => {
        checkUser()
    })

    return (
        <div>
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Профиль
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Логин: {login}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}