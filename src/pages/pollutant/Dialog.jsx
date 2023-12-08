import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useEffect, useState} from "react";
import {Alert, AlertTitle, Box, Card, TextField} from "@mui/material";
import {store} from "../../actions/pollutant";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {

    const [open, setOpen] = useState(props.open);
    const [valid, setValid] = useState(true);

    const [params, setParams] = useState({
        sysName: '',
        name: '',
        code: ''
    });

    const handleClose = (e) => {
        setOpen(false);
        props.onClose(false)
    };

    useEffect (() => setOpen(props.open), [props.open])

    const storeData = () => {

        if(params.name !== '' && params.sysName !== '' && params.code !== ''){
            store({
                sysName: params.sysName,
                code: params.code,
                name: params.name
            }).then(() => {
                handleClose()
                props.reload(true)
            })
        }else{
            setValid(false)
        }
    }

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Добавить
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            '& > :not(style)': {mr: 2, mb: 2,width: '300px'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Наименование" variant="outlined" onChange={e => setParams({...params, name: e.target.value})}/>
                        <TextField id="outlined-basic" label="Код вещества" variant="outlined" onChange={e => setParams({...params, code: e.target.value})}/>
                        <TextField id="outlined-basic" label="Системный код" variant="outlined" onChange={e => setParams({...params, sysName: e.target.value})}/>
                    </Box>

                    {!valid &&
                    <Alert severity="error">
                        <AlertTitle>Не все поля заполнены</AlertTitle>
                    </Alert>}

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={storeData}>
                        Сохранить
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}