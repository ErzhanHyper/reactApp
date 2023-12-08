import * as React from 'react';
import {useEffect, useState} from "react";
import {Autocomplete, CircularProgress, createFilterOptions, TextField} from "@mui/material";
import {list} from "../../actions/pollutant";

export default function PollutantSelect(props) {
    const [items, setItems] = useState([]);
    const loading = open && items.length === 0;

    const handleChange = (value) => {
        props.data(value)
        if (props.onChange) {
            props.onChange(value)
        }
    };

    const createFilterOptions = () => {
        let options = []
        if (props.options) {
            options = props.options
        }else{
            options = items
        }
        return options
    };


    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        (async () => {
            await list({
                page: 1,
                pagination: true
            }).then(res => {
                if (active) {
                    setItems([...res])
                }
            });
        })();

        return () => {
            active = false;
        };
    }, [props.data, loading]);

    return (
        <div>

            <Autocomplete
                sx={{width: 300}}
                loading={loading}
                options={items}
                filterOptions={createFilterOptions}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => '' + option.name + ' - ' + option.code}
                onChange={(event, newValue) => handleChange(newValue ? newValue : event)}
                        renderInput={(params) => <TextField {...params} label="Наименование ЗВ" InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20}/> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                    ),
                }}/>
                }
            />
        </div>
    );
}
