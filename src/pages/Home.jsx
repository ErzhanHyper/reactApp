import React from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

export default function Home(){
    return (
        <div>
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                       Информация
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Расчет объемов загрязняющих веществ при сбросе сточных вод
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}