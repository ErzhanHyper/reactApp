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
import {list, remove} from "../../actions/region";
import MrpDialog from './Dialog'
import RemoveIcon from "@mui/icons-material/Delete";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Pollutant() {
    const [items, setItems] = useState([])
    const [open, setOpen] = useState(false);
    const [reload, reloadData] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

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
    }, []);


    if (reload) {
        fetchData()
    }

    return (
        <div>

            <Typography mb={2} variant={'h5'}>Регионы</Typography>

            <Card variant={'outlined'}>
                <Typography sx={{fontSize: 14, display: 'flex', justifyContent: 'flex-end', mt: '15px', mr: '15px'}}
                            color="text.secondary" gutterBottom>
                    <Button variant="contained" endIcon={<AddIcon/>} onClick={handleClickOpen}>
                        Добавить
                    </Button>
                </Typography>

                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Наименование</TableCell>
                                <TableCell>Действие</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.length > 0 && items.map((row) => (
                                <TableRow
                                    key={row.sysName}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>

                                    <TableCell>
                                        <Button className="customIconButton" sx={{fontSize: '12px'}} onClick={() => removeItem(row.id)} variant="outlined">
                                            <DeleteIcon color="error" sx={{fontSize: '22px'}}/>
                                        </Button>
                                    </TableCell>
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