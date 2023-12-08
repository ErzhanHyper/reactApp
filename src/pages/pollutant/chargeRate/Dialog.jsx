import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {useEffect, useState} from "react";
import {Alert, AlertTitle, Box, TextField} from "@mui/material";
import PollutantSelect from "../../../components/formComponents/PollutantSelect";
import RegionSelect from "../../../components/formComponents/RegionSelect";
import MrpSelect from "../../../components/formComponents/MrpSelect";
import {store} from "../../../actions/pollutantChargeRate";

export default function CustomizedDialogs(props) {

    const [open, setOpen] = useState(props.open);
    const [valid, setValid] = useState(true);

    const [params, setParams] = useState({
        baseRate: 0,
        increasedRate: 1,
    });

    const [pollutant, setPollutant] = useState(null);
    const [region, setRegion] = useState(null);
    const [mrp, setMrp] = useState(null);

    const handleClose = (e) => {
        setOpen(false);
        props.onClose(false)
    };

    useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    const storeData = () => {
        if(pollutant !== '' && region !== '' && params.baseRate > 0) {
            store({
                pollutant: pollutant['@id'],
                region: region['@id'],
                baseRate: parseFloat(params.baseRate),
                increasedRate: parseFloat(params.increasedRate)
            }).then((res) => {
                handleClose()
                props.reload(true)
            }).catch(e => console.log(e))
        }else{
            setValid(false)
        }
    }

    return (
        <div>
            <Dialog
                onClose={handleClose}
                open={open}
            >
                <DialogTitle onClose={handleClose}>
                    Добавить
                </DialogTitle>
                <DialogContent dividers>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            '& > :not(style)': {mr: 2, mb: 1,mt: 1, width: 300},
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <PollutantSelect data={setPollutant}/>
                        <RegionSelect data={setRegion}/>

                        <TextField id="outlined-basic" label="Базовая ставка" variant="outlined" type="number"
                                   onChange={e => setParams({...params, baseRate: e.target.value})}/>

                        <TextField id="outlined-basic" label="Повышенное ставка" variant="outlined" type="number"
                                   onChange={e => setParams({...params, increasedRate: e.target.value})}/>
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
            </Dialog>
        </div>
    );
}