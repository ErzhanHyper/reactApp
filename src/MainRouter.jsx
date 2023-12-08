import React, {useEffect, useState} from "react";

import {BrowserRouter, Route, Routes, useNavigate, useParams, useLocation } from "react-router-dom";

import Mrp from "./pages/mrp";
import User from "./pages/user";
import Profile from "./pages/Profile";
import Region from "./pages/region";
import Pollutant from "./pages/pollutant";
import PollutantChargeRate from "./pages/pollutant/chargeRate";
import EmissionsList from "./pages/calculators/emissionsTax/Index";
import WastewaterList from "./pages/calculators/wastewaterTax/Index";
import WastewaterDetail from "./pages/calculators/wastewaterTax/Detail";
import Home from "./pages/Home";

export default function MainRouter() {

    return (
        <Routes>
            <Route >
                <Route exact path="/" element={<Home/>}/>

                <Route exact path="/emissions" element={<EmissionsList/>}/>

                <Route exact path="/wastewater" element={<WastewaterList/>}/>
                <Route path="/wastewater/:wastewaterId" element={<WastewaterDetail/>}/>

                <Route path="/mrp" element={<Mrp/>}/>
                <Route path="/region" element={<Region/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route exact path="/pollutant" element={<Pollutant/>}/>
                <Route path="/pollutant/chargeRate" element={<PollutantChargeRate/>}/>
                <Route path="/user" element={<User/>}/>
            </Route>
        </Routes>
    )
}