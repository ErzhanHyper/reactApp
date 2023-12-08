import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent, Divider, IconButton,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add'
import {list, remove} from "../../actions/pollutant";
import MrpDialog from './Dialog'
import RemoveIcon from "@mui/icons-material/Delete";
import DeleteIcon from "@mui/icons-material/Delete";
import {getUser} from "../../actions/auth";

export default function Pollutant() {
    const [items, setItems] = useState([])
    const [open, setOpen] = useState(false);
    const [reload, reloadData] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const [accessActions, setAccessActions] = useState(false)

    const checkUser = () => {
        getUser().then(res => {
            if (res.roles) {
                res.roles.filter(el => {
                    if (el === 'ROLE_ADMIN') {
                        setAccessActions(true)
                    }
                })
            }
        })
    }

    const removeItem = (id) => {
        remove(id).then(() => {
            fetchData()
        });
    }

    const fetchData = async e => {
        await list({
            page: 1,
            pagination: true
        }).then(r => setItems(r));
    }

    useEffect(() => {
        fetchData()
        checkUser()
    }, []);


    if (reload) {
        fetchData()
    }

    return (
        <div>

            <Typography mb={2} variant={'h5'}>Загрязняющее вещество</Typography>

            <Card variant={'outlined'}>
                {accessActions &&
                <Typography sx={{fontSize: 14, display: 'flex', justifyContent: 'flex-end', mt: '15px', mr: '15px'}}
                            color="text.secondary" gutterBottom>
                    <Button variant="contained" endIcon={<AddIcon/>} onClick={handleClickOpen}>
                        Добавить
                    </Button>
                </Typography>
                }

                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Наименование</TableCell>
                                <TableCell>Код</TableCell>
                                {accessActions && <TableCell>Действие</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.length > 0 && items.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.code ? row.code : '-'}
                                    </TableCell>

                                    {accessActions && <TableCell>
                                        <Button className="customIconButton" sx={{fontSize: '12px'}}
                                                onClick={() => removeItem(row.id)} variant="outlined">
                                            <DeleteIcon color="error" sx={{fontSize: '22px'}}/>
                                        </Button>
                                    </TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            {open &&
            < MrpDialog open={open} onClose={setOpen} reload={reloadData}/>
            }
        </div>
    )
}