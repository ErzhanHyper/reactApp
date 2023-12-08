import {IconButton, MenuItem, Menu, Fade, ListItem, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useToken from "../utils/useToken";

export function ProfileBtn(props) {
    const {token, setToken} = useToken()
    const history = useNavigate();

    function logout(){
        localStorage.removeItem('token');
        history('/login')
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <div>
        <IconButton
            id="fade-button"
            size="large"
            color="inherit"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{padding: 0}}
        >
            <Typography variant="h5" sx={{mx: 1}}>{props.user && props.user.login}</Typography>
            <AccountCircle/>

        </IconButton>

        <Menu
            id="fade-menu"
            MenuListProps={{
                'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            <MenuItem onClick={handleClose} component={Link} to='/profile'>Профиль</MenuItem>
            <MenuItem onClick={logout}>Выйти</MenuItem>
        </Menu>

    </div>
}