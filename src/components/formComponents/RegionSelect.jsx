import * as React from 'react';
import {useEffect, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {list} from "../../actions/region";

export default function RegionSelect(props) {

    const [items, setItems] = useState([]);

    const fetchData = async e => {
        await list({
            page: 1,
            pagination: true
        }).then(r => setItems(r));
    }

    const handleChange = (value) => {
        props.data(value)
        if(props.onChange) {
            props.onChange(value)
        }

    };

    useEffect(() => {
        fetchData()
    }, [props.data])


    return (
        <div>
            <Autocomplete
                sx={{ width: 300 }}
                options={items}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) =>handleChange(newValue ? newValue : event)}
                renderInput={(params) => <TextField {...params} label="Регионы" />}
            />
        </div>
    );
}