import React, {useEffect, useState} from "react";
import {pdf as getPdf} from "../actions/wastewaterCalculation";
import LoadingButton from "@mui/lab/LoadingButton";
import PdfIcon from '@mui/icons-material/PictureAsPdf'

export default function PdfTaxCalc(params) {

    const [loading, setLoading] = useState(false)

    async function generatePDF() {
        setLoading(true)
        if (params.wastewaterCalculationId) {
            await getPdf(params.wastewaterCalculationId).then(res => {
                let url = window.URL.createObjectURL(res);
                let a = document.createElement('a');
                a.href = url;
                a.download = "РасчетСброса.pdf";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }).finally(() => {
                setLoading(false)
            })
        }
    }
    return (
        <div>
            <LoadingButton variant="contained" color="secondary" onClick={generatePDF} loading={loading}><PdfIcon /> Скачать документ</LoadingButton>
        </div>
    )
}