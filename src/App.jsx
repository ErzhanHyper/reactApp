import './styles/app.scss'

import React, {useEffect, useState} from 'react'

import {AppBar, Box, createTheme, Divider, Drawer, IconButton, LinearProgress, List} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import MainHeader from "./components/Header";
import MainMenuItems from "./components/MainMenuItems";
import MainRouter from "./MainRouter";
import useToken from "./utils/useToken";
import Login from "./pages/Login";
import {ThemeProvider} from "@emotion/react";

import {getUser} from './actions/auth'
import {redirect, useLocation, useNavigate} from "react-router-dom";
import Emitter from "./utils/emitter";

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(21,46,59)',
        },
    },
});

const drawerWidth = 240;

function App() {
    const history = useNavigate();

    const {token, setToken} = useToken()
    const [open, openMenu] = useState(true);
    const [authenticated, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState({})

    const location = useLocation();
    useEffect(() => {
        checkUser()
    }, [authenticated, token, location.key]);

    const checkUser = async () => {
        setLoading(true)
        await getUser().then(res => {
            if (res.code && res.code === 401) {
                setAuth(false)
                setToken(null);
            } else {
                setAuth(true)
                setUser(res)
            }
        })
        Emitter.on('RUN_PROGRESS_BAR', (newValue) => setLoading(false))
    }
    if (!token) {
        return <Login setToken={setToken}/>;
    }

    return <ThemeProvider theme={theme}>

        {loading && (
            <LinearProgress color="secondary" sx={{zIndex: 10000, height: '2px'}}/>
        )}

        <Box sx={{display: 'flex'}}>

            <AppBar component="nav" position={"fixed"} open={true} color='primary'>
                <MainHeader onToggleMenu={openMenu} active={open} user={user}/>
            </AppBar>

            <Drawer variant="permanent"
                    anchor="left"
                    open={true} sx={{
                zIndex: 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: open ? drawerWidth : 60,
                    boxSizing: 'border-box',
                },
            }}>
                {open && (
                    <Box sx={{
                        height: 48,
                        display: "flex",
                        justifyContent: open ? "flex-end" : 'center',
                        alignItems: "center"
                    }}>
                        <IconButton onClick={() => openMenu(false)}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Box>
                )}

                <Divider/>

                <MainMenuItems/>

            </Drawer>

            <Box component="main"
                 sx={{
                     p: 4,
                     width: `calc(100% - ${open ? drawerWidth : 0}px)`,
                     marginLeft: `${open ? drawerWidth : 60}px`,
                     marginTop: '38px'
                 }}>

                {authenticated && (
                    <MainRouter/>
                )}
            </Box>
        </Box>
    </ThemeProvider>
}

export default App

