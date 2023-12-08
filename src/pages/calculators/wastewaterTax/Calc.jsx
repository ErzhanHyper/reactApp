import {
    Alert, AlertTitle,
    Box,
    Button,
    Card,
    CardContent, Dialog,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddIcon from "@mui/icons-material/Add";

import React, {useEffect, useState} from "react";
import RegionSelect from "../../../components/formComponents/RegionSelect";
import {get as getPollutantChargeRate} from "../../../actions/pollutantChargeRate";
import {store as storeWastewater} from "../../../actions/wastewater";
import PollutantSelect from "../../../components/formComponents/PollutantSelect";
import PdfTaxCalc from "../../../components/PdfTaxCalc";
import {store as storeWastewaterCalculation, update} from "../../../actions/wastewaterCalculation";
import {formatSpacing} from "../../../utils/formatSpacing";
import EditIcon from "@mui/icons-material/Edit";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MrpSelect from "../../../components/formComponents/MrpSelect";
import QuarterSelect from "../../../components/formComponents/QuarterSelect";
import LoadingButton from "@mui/lab/LoadingButton";

const Calc = (props) => {
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [showCard, setShowCard] = useState(true)
    const [showRegion, setShowRegion] = useState(false)

    const [mrp, setMrp] = useState(null);
    const [quarter, setQuarter] = useState(null);
    const [name, setName] = useState('');

    const [substance, setSubstance] = useState(null)
    const [region, setRegion] = useState(null)

    const [chargeRate, setChargeRate] = useState(0)
    const [totalPay, setTotalPay] = useState(0)
    const [tonne, setTonne] = useState(0)

    const [availablePollutants, setAvailablePollutants] = useState([])
    const [availableMrp, setAvailableMrp] = useState([])

    const [valid, setValid] = useState(true)

    const [params, setParams] = useState({
        region: null,
        pollutant: null,
        mrp: null,
        name: ''
    })
    const [wastewater, setWastewater] = useState({
        waterVolume: 0,
        concentration: 0,
        id: null
    })

    useEffect(() => {

        if (props.data) {
            setShowRegion(true)
            wastewater.id = props.data.id
            params.name = props.data.name
            params.mrp = props.data.mrp
            params.quarter = props.data.quarter
            setName(props.data.name)
            setQuarter(props.data.quarter)
            setMrp(props.data.mrp)
        }

    }, [props.data])

    const showDialog = () => {
        setOpen(true)
    }

    const closeDialog = () => {
        setOpen(false)
    }

    const updateData = () => {
        setLoading(true)
        update(wastewater.id, {
            name: name,
            quarter: quarter
        }).then(res => {
            setParams({
                ...params,
                "name" : res.name,
                "quarter": res.quarter,
            });
        }).finally(() => {
            setLoading(false)
            setOpen(false)
        })
    }

    const runCalculation = () => {
        if (wastewater.id) {
            storeWastewaterCalculation(wastewater.id, {
                pollutionChargeRate: chargeRate['@id'],
                actualConcentration: parseInt(wastewater.concentration),
                waterVolume: parseInt(wastewater.waterVolume)
            }).then(data => {
                if (data) {
                    setTotalPay(data.totalToPay)
                    props.onUpdated(true)
                    setTimeout(() => {
                        props.onUpdated(false)
                    }, 100)
                }
            })
        }
    }

    const getAvailablePollutant = (res) => {
        let result = []
        res.filter(function (item) {
            let i = result.findIndex(x => (x.name === item.pollutant.name));
            if (i <= -1) {
                result.push(item.pollutant);
            }
            return null;
        });

        setAvailablePollutants([...result])
    }

    const calcPollutant = (res) => {
        convertToTonne()
        if (res && res.length > 0) {
            if (res[0].baseRate) {
                setChargeRate(res[0])
            }
        }
    }

    const handlePollutantChange = async (evt) => {
        setChargeRate(0)
        setAvailableMrp([])
        setTotalPay(0)

        if (evt) {
            setParams({
                ...params,
                "pollutant": evt['@id'],
            });
            await getPollutantChargeRate({
                page: 1,
                pagination: true,
                pollutant: evt['@id'],
                region: params.region
            }).then(res => {
                calcPollutant(res)
            })
        }
    }

    const handleRegion = (evt) => {
        if (evt) {
            setParams({
                ...params,
                "region": evt['@id'],
                "pollutant": null
            });
            setAvailableMrp([])
            setAvailablePollutants([])

            setTotalPay(0)
            setSubstance(null)

            getPollutantChargeRate({
                page: 1,
                pagination: true,
                region: evt['@id'],
            }).then(res => {
                getAvailablePollutant(res)
            })
        }
    }

    const handleWastewaterChange = (evt) => {
        const value = evt.target.value;
        setWastewater({
            ...wastewater,
            [evt.target.name]: value
        });

        convertToTonne(evt)
    }

    const convertToTonne = (value) => {
        let v = wastewater.waterVolume
        let c = wastewater.concentration
        if (value) {
            if (value.target.name === 'waterVolume') {
                v = value.target.value
            }
            if (value.target.name === 'concentration') {
                c = value.target.value
            }
        }
        let result = ((v * 0.001) * c) / 1000
        setTonne(result)
    }

    return (
        <div>

            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant="outlined" startIcon={<EditIcon/>} onClick={() => showDialog()}>
                    Изменить
                </Button>
                {wastewater.id && <PdfTaxCalc wastewaterCalculationId={wastewater.id}/>}
            </Box>

            {showCard && (
                <Card sx={{mt: 2}} variant="outlined">

                    <CardContent>
                        <Box component="form" noValidate autoComplete="off" sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            {showRegion && (
                                <Typography variant="h5" sx={{mb: 1}}>{params.name}</Typography>
                            )}
                            <Typography variant="h6" sx={{m: 1}}>{'Калькулятор'}</Typography>
                        </Box>

                        {showRegion && (
                            <Box component="form" noValidate autoComplete="off" sx={{
                                my: 2,
                                display: 'flex',
                                '& > :not(style)': {mr: 2}
                            }}>
                                <RegionSelect data={setRegion} onChange={handleRegion}/>

                                <TextField label="Квартал" variant="outlined"
                                           sx={{width: 300}}
                                           name="mrp"
                                           type='number'
                                           disabled
                                           value={params.quarter ? params.quarter : 0}
                                />

                                <TextField label="МРП" variant="outlined"
                                           sx={{width: 300}}
                                           name="mrp"
                                           type='number'
                                           disabled
                                           value={params.mrp ? params.mrp.year : 0}
                                />
                            </Box>
                        )}

                        <Box component="form" noValidate autoComplete="off" sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            mb: 2,
                            '& > :not(style)': {mr: 2, mb: 2, mt: 2}
                        }}>
                            {availablePollutants.length > 0 && params.region && (
                                <PollutantSelect data={setSubstance} onChange={handlePollutantChange}
                                                 options={availablePollutants}/>
                            )}

                            {params.pollutant && params.mrp && (
                                <Box sx={{
                                    '& > :not(style)': {mr: 2}
                                }}>
                                    <TextField label="Фактическая концентрация, мг/л" variant="outlined"
                                               sx={{width: 300}}
                                               name="concentration"
                                               type='number'
                                               onChange={
                                                   (event) => {
                                                       handleWastewaterChange(event)
                                                   }}/>

                                    <TextField label="Объем воды, м3" variant="outlined"
                                               name="waterVolume"
                                               sx={{width: 300}}
                                               type='number'
                                               onChange={
                                                   (event) => {
                                                       handleWastewaterChange(event)
                                                   }}/>
                                </Box>
                            )}

                            {params.pollutant && params.mrp && (
                                <Box sx={{
                                    '& > :not(style)': {mr: 2}
                                }}>
                                    <TextField label="Перевод в тонны" variant="filled" readOnly value={tonne}
                                               sx={{width: 300}}/>

                                    <TextField label="Ставки платы" variant="filled" readOnly
                                               sx={{width: 300}}
                                               value={chargeRate.baseRate ?? 0}/>

                                    {chargeRate.increasedRate !== 0 && (
                                        <TextField label="Повышенная ставка платы" variant="filled" readOnly
                                                   value={chargeRate.increasedRate ?? 0} sx={{width: 300}}/>
                                    )}
                                </Box>

                            )}

                        </Box>

                        {availablePollutants.length > 0 && wastewater.waterVolume > 0 && wastewater.concentration > 0 && params.mrp != null && (
                            <Box>
                                <Stack
                                    direction="row"
                                    divider={<Divider orientation="vertical" flexItem/>}
                                    spacing={4}
                                    alignItems="center"
                                >
                                    <Button variant="contained"
                                            onClick={() => runCalculation()}>Расчитать</Button>

                                    {totalPay > 0 && wastewater.waterVolume > 0 && wastewater.concentration > 0 && (
                                        <Box><b>Итого к оплате: {formatSpacing(totalPay)}</b> &#8376;</Box>)}
                                </Stack>
                            </Box>
                        )}

                    </CardContent>
                </Card>)}

            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle >
                    Изменить
                </DialogTitle>
                <DialogContent dividers>
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
                                   value={name}
                                   name="name"
                                   onChange={(e) => setName(e.target.value)}/>

                        <QuarterSelect data={setQuarter} item={quarter}/>
                    </Box>

                    {!valid &&
                    <Alert severity="error">
                        <AlertTitle>Не все поля заполнены</AlertTitle>
                    </Alert>}
                </DialogContent>
                <DialogActions>
                    <LoadingButton autoFocus onClick={() => updateData()} loading={loading}>
                        Сохранить
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Calc