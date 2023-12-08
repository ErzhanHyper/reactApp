import {
    Box, Card, IconButton,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {list as wastewaterList, remove as wastewaterRemove, get as wastewaterDetail} from "../../../actions/wastewater";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {Link, useParams} from "react-router-dom"
import Calc from "./Calc";
import {formatSpacing} from "../../../utils/formatSpacing";
import Button from "@mui/material/Button";

export default function WastewaterDetail(props) {
    const {wastewaterId} = useParams()
    const [updated, setUpdated] = useState(false)

    const [items, setItems] = useState([])
    const [item, setItem] = useState(null)

    const fetchData = async e => {
        setItems([])
        wastewaterList(wastewaterId, {}).then(data => {
            setItems(data)
        });
        wastewaterDetail(wastewaterId).then(data => {
            setItem(data)
        });
    }

    const removeItem = (wastewaterCalculationId, id) => {
        wastewaterRemove(wastewaterCalculationId, id).then(() => {
            fetchData()
        });
    }

    useEffect(() => {
        fetchData()
        if (updated) {
            fetchData()
        }
    }, [updated]);


    return (
        <div>
            <Box sx={{mb: 4}}>
                <Calc data={item} onUpdated={setUpdated}/>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <Typography variant="h6" sx={{m: 1}}>{'Все расчеты'}</Typography>

            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>

            </Box>
            <TableContainer>
                <Table sx={{minWidth: 650}} size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>ЗВ</TableCell>
                            <TableCell>Регион</TableCell>
                            <TableCell>Мрп</TableCell>
                            <TableCell>Ставка платы</TableCell>
                            <TableCell>Фактическая концентрация, мг/л</TableCell>
                            <TableCell>Объем воды, м3</TableCell>
                            <TableCell>Перевод в тонны</TableCell>
                            <TableCell>Итого к оплате</TableCell>
                            <TableCell>Действие</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.length > 0 && items.map((el, i) => (
                            <TableRow
                                key={i}
                            >
                                <TableCell component="th" scope="row">
                                    {el.pollutionChargeRate ? el.pollutionChargeRate.pollutant.name : ''}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {el.pollutionChargeRate ? el.pollutionChargeRate.region.name : ''}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {el.pollutionChargeRate ? el.pollutionChargeRate.mrp : ''}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    Базовая
                                    ставка: {el.pollutionChargeRate ? formatSpacing(el.pollutionChargeRate.baseRate) : ''} &#8376;
                                    <br/>
                                    Повышенная
                                    ставка: {el.pollutionChargeRate ? formatSpacing(el.pollutionChargeRate.increasedRate) : ''} &#8376;
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {el.actualConcentration}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {formatSpacing(el.waterVolume)}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {el.conversionToTons}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <b>{formatSpacing(el.totalToPay)}</b> &#8376;
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <IconButton onClick={() => removeItem(wastewaterId, el.id)}> <DeleteIcon
                                        color="error"/></IconButton>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
