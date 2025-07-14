// import { Outlet } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import Envelopes from "./envelopes/envelopes";
import Header from "./header";
import { useState } from "react";

export default function () {
    const [tab, setTab] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newTab: number) => {
        setTab(newTab);
    };

    return (
        <>
            <Header />
            <Tabs 
                value={tab} 
                onChange={handleChange} 
                aria-label="Main tab area"
                sx={{ backgroundColor: "green" }}
                textColor="inherit"
                TabIndicatorProps={{ style: { backgroundColor: "white" } }}
            >
                <Tab label="Debit 1" sx={{ color: "white", fontSize: "x-small" }} />
                <Tab label="Credit 1" sx={{ color: "white", fontSize: "x-small" }} />
                <Tab label="BTC 1" sx={{ color: "white", fontSize: "x-small" }} />
            </Tabs>

            {tab === 0 && <Envelopes />}
            {tab === 1 && <div>Credit 1</div>}
            {tab === 2 && <div>BTC 1</div>}


            {/* <Outlet /> */}
        </>
    )
}