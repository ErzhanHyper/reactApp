import {Badge, Box, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {ProfileBtn} from "./ProfileBtn";

export default function MainHeader(props) {

    function toggleMenu(value){
        props.onToggleMenu(value)
    }

    return (
        <div>
            <Toolbar variant={"dense"} className={open ? 'open' : ''}>

                { !props.active &&
                <IconButton
                    color="inherit"
                    onClick={() => toggleMenu(true)}
                >
                    <MenuIcon/>
                </IconButton>
                }
                <Typography
                    variant="h5"
                    color="inherit"
                    noWrap
                >
                    Eco
                </Typography>

                <Box sx={{flexGrow: 1}}/>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    <ProfileBtn user={props.user}/>
                </Box>
            </Toolbar>
        </div>
    )
}