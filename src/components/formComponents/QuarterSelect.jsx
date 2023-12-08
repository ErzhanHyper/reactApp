import * as React from 'react';
import {Autocomplete, TextField} from "@mui/material";
import {useEffect, useState} from "react";

export default function QuarterSelect(props) {

    const [item, setItem] = useState(null);
    const items = [1,2,3,4]

    const handleChange = (value) => {
        props.data(value)
    };

    useEffect(() => {
        if(props.item){
            setItem(props.item)
        }
    }, [props.item])

    return (
        <div>
            <Autocomplete
                value={item && item}
                sx={{width: 300}}
                options={items}
                getOptionLabel={(option) => '' + option}
                onChange={(event, newValue) =>handleChange(newValue)}
                renderInput={(params) => <TextField {...params} label="Квартал"/>}
            />
        </div>
    );
}