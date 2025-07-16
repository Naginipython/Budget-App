import { debug } from "@tauri-apps/plugin-log";
import NewEnvelopeHeader from "./newEnvelopeHeader";
import { ChangeEventHandler, useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { Envelope } from "../../../assets/interfaces";
import Database from "@tauri-apps/plugin-sql";
import { useNavigate } from "react-router-dom";


export default function () {
    const [envelopeName, setEnvelopeName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);

    const [limit, setLimit] = useState<string>("0.00");
    const [limitError, setLimitError] = useState<boolean>(false);
    const [limitErrorMsg, setLimitErrorMsg] = useState<string>("");

    // const [type, setType] = useState<string>("$");
    const [period, setPeriod] = useState<string>("Biweekly");
    const navigate = useNavigate();

    const handleLimit: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.currentTarget.value;
        
        if (value === "") {
            setLimit("");
            return;
        }
        // Allow only numbers and at most two decimal points
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setLimit(value);
            setLimitError(false);
        } else {
            setLimit(value);
            setLimitError(true);
            setLimitErrorMsg("Please enter a valid number with up to two decimal places");
        }
    };
    const handleBlur = () => {
        if (limit === '') {
            setLimit('0.00');
        } else if (!limitError) {
            setLimit(Number(limit).toFixed(2).toString());
        }
    }

    const handleSubmit = async () => {
        debug("Form submitted");
        if (envelopeName.trim() === "") {
            setNameError(true);
        }
        if (limitError || limit === "0.00") {
            setLimitError(true);
            if (!limitError) setLimitErrorMsg("Please enter a valid limit greater than 0.00");
        }
        if (nameError || limitError) return;
        const envelope: Envelope = {
            id: -1,
            title: envelopeName,
            balance: 0,
            balance_limit: parseFloat(limit),
            period: period,
            created_at: new Date().toISOString(),
        }
        console.log(envelope);
        const db = await Database.load("sqlite:budget.db");
        // await db.execute(
        //     "DROP TABLE IF EXISTS envelopes"
        // );
        await db.execute(
            "CREATE TABLE IF NOT EXISTS envelopes (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255), balance REAL, balance_limit REAL, period VARCHAR(255), ordering INTEGER, created_at TIMESTAMP)"
        );
        // TODO: Check if title exists
        const existingEnvelope: Envelope[] = await db.select("SELECT * FROM envelopes WHERE title = ?", [envelope.title]);
        if (existingEnvelope.length > 0) {
            setNameError(true);
            return;
        }
        const result = await db.execute(
            "INSERT INTO envelopes (title, balance, balance_limit, period, created_at) VALUES (?, ?, ?, ?, ?)",
            [envelope.title, envelope.balance, envelope.balance_limit, envelope.period, envelope.created_at]
        );
        debug(JSON.stringify(result));
        envelope.id = result.lastInsertId? result.lastInsertId : -1;
        debug(JSON.stringify(envelope));
        // You can use navigate(-1) to go back one step in the history stack
        navigate(-1);
    };

    return (
        <>
            <NewEnvelopeHeader onSave={handleSubmit} />
            <TextField 
                sx={{ margin: "30px 2vw", width: "46vw" }}
                label="Envelope Name" 
                variant="outlined"
                value={envelopeName}
                onFocus={() => setNameError(false)}
                onChange={(e) => setEnvelopeName(e.target.value)}
                error={nameError}
                helperText={nameError ? "Envelope name cannot be empty" : ""}
            />
            <TextField
                sx={{ margin: "30px 2vw", width: "46vw" }}
                variant="outlined"
                label="Budget Limit"
                value={limit}
                onFocus={() => { if (limit === '0.00') setLimit('') }}
                onBlur={handleBlur}
                onChange={handleLimit}
                error={limitError}
                helperText={limitError ? limitErrorMsg : ""}
            />
            <br />
            <Box
                sx={{ display: "flex", justifyContent: "center", margin: "0px 2vw" }}
            >
                {/* <TextField
                    sx={{ margin: "20px" }}
                    select
                    label="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem value={"$"}>$</MenuItem>
                    <MenuItem value={"₿"}>₿</MenuItem>
                </TextField> */}
                <TextField
                    sx={{ margin: "20px" }}
                    select
                    label="Period"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                >
                    <MenuItem value={"Biweekly"}>Biweekly</MenuItem>
                    <MenuItem value={"Monthly"}>Monthly</MenuItem>
                    <MenuItem value={"Weekly"}>Weekly</MenuItem>
                    <MenuItem value={"Yearly"}>Yearly</MenuItem>
                </TextField>
            </Box>
        </>
    );
}