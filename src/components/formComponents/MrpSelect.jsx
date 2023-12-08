import * as React from 'react';
import {useEffect, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {list} from "../../actions/mrp";

export default function MrpSelect(props) {

    const [items, setItems] = useState([]);
    const loading = open && items.length === 0;
    const [item, setItem] = useState(null);

    const handleChange = (value) => {
        props.data(value)
        if (props.onChange) {
            props.onChange(value)
        }
    };


    const createFilterOptions = () => {
        let options = items
        if (props.options) {
            options = props.options
        }
        return options
    };

    useEffect(() => {

        if(props.item){
            setItem(props.item)
        }

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
    }, [props.item, props.data, loading]);


    return (
        <div>
            {items.length > 0 &&
            <Autocomplete
                value={item && item}
                sx={{width: 300}}
                loading={loading}
                options={items}
                filterOptions={createFilterOptions}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => '' + option.year}
                onChange={(event, newValue) => handleChange(newValue)}
                renderInput={(params) => <TextField {...params} label="Мрп"/>}
            />
            }
        </div>
    );
}