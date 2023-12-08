import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent, Divider,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add'

function createData(name, tax) {
    return {name, tax};
}

const rows = [
];

export default function User() {
    return (
        <div>
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Пользователи
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Наименование</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.tax}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </div>
    )
}