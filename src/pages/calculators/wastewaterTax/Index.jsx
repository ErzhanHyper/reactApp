import React, {useState} from "react";
import {
    Card,
} from "@mui/material";
import WastewaterList from "./List";
import Calc from "./Calc";

export default function TaxCalculation() {

    const [updated, setUpdated] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [wastewater, setWastewater] = useState(null)

    return (
        <div>
            <WastewaterList showDialog={setShowDialog} getData={setWastewater} updated={updated}/>
        </div>
    )
}