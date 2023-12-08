import {
    Alert, AlertTitle,
    Box, Button, Card, Dialog, DialogActions, DialogContent,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow, TextField, Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {list as wastewaterList, store as storeWastewater} from "../../../actions/wastewater";
import {list as wastewaterCalcList, remove as wastewaterCalcRemove} from "../../../actions/wastewaterCalculation";

import VisibilityIcon from "@mui/icons-material/Visibility";

import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";
import {useNavigate} from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import {formatSpacing} from "../../../utils/formatSpacing";
import MrpSelect from "../../../components/formComponents/MrpSelect";
import QuarterSelect from "../../../components/formComponents/QuarterSelect";

export default function WastewaterList(props) {

    const history = useNavigate();

    const [valid, setValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([])
    const [name, setName] = useState([])
    const [mrp, setMrp] = useState(null)
    const [quarter, setQuarter] = useState(null)

    const [showDialog, setShowDialog] = useState(false)

    const fetchData = async e => {
        setItems([])
        await wastewaterCalcList({}, {
            page: 1,
            pagination: true
        }).then((r) => {
            setItems(r)
        });
    }

    const handleClose = () => {
        setShowDialog(false)
    };

    const createCalc = () => {

        if(mrp !== null && name !== '' && quarter !== null) {
            storeWastewater({
                name: name,
                mrp: mrp['@id'],
                quarter: quarter
            }).then((res) => {
                history('/wastewater/' + res.id)
            })
        }else{
            setValid(false)
        }
    }

    const newCalcDialog = () => {
        setShowDialog(true)
    }

    const remove = (value) => {
        setLoading(true)
        wastewaterCalcRemove(value.id).then(() => {
            fetchData()
            setLoading(false)
        });
    }

    useEffect(() => {
        fetchData()

        if (props.updated) {
            fetchData()
        }
    }, [props.updated]);


    return (
        <div>
            <Box sx={{display: 'flex'}}>
                <Button variant="outlined" endIcon={<AssessmentIcon/>} size="large" onClick={() => newCalcDialog()}>Создать
                    калькуляцию</Button>
            </Box>

            <Card variant="outlined" sx={{mt: 4}}>
                <Typography variant="h6" sx={{m: 1}}>Расчет сброса</Typography>
                <TableContainer>
                <Table sx={{minWidth: 650}} size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Наименование</TableCell>
                            <TableCell>МРП</TableCell>
                            <TableCell>Квартал</TableCell>
                            <TableCell>Итого</TableCell>
                            <TableCell>Действие</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items && items.length > 0 && items.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                    <Link to={'/wastewater/' + row.id}>{row.id}</Link>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Link to={'/wastewater/' + row.id}>{row.name ?? '-'}</Link>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.mrp ? row.mrp.year : ''}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.quarter ? row.quarter + ' квартал' : ''}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {formatSpacing(row.totalCharge)} &#8376;
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Button className="customIconButton" variant="outlined" sx={{fontSize: '12px', mr:1}} to={'/wastewater/' + row.id} component={Link}>
                                        <VisibilityIcon sx={{fontSize: '22px'}}/>
                                    </Button>
                                    <Button className="customIconButton" sx={{fontSize: '12px'}} onClick={() => remove(row)} variant="outlined"> <DeleteIcon color="error"
                                        sx={{fontSize: '22px'}}/></Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Card>

            <Dialog
                open={showDialog}
                onClose={handleClose}
            >
                <DialogTitle>
                    {"Расчет сброса"}
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            '& > :not(style)': {mt: 1, mr: 2, mb: 1, width: 300},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField label="Наименование калькуляции" variant="outlined"
                                   name="name"
                                   onChange={(e) => setName(e.target.value)}/>

                        <MrpSelect data={setMrp}/>
                        <QuarterSelect data={setQuarter}/>
                    </Box>

                    {!valid &&
                    <Alert severity="error">
                        <AlertTitle>Не все поля заполнены</AlertTitle>
                    </Alert>}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button onClick={() => createCalc()} variant="outlined">Создать</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}
