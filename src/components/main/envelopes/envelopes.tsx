import { Box, Typography } from '@mui/material';
import EnvelopeElm from './envelope';
import { useEffect, useState } from 'react';
import Database from '@tauri-apps/plugin-sql';
import { debug } from '@tauri-apps/plugin-log';
import { Envelope } from '../../../assets/interfaces';

export default function () {
    const [data, setData] = useState<any>([]);
    const [total, setTotal] = useState<number>(0);
    useEffect(() => {
        // TODO: Only fetch data once, otherwise use store
        const fetchData = async () => {
            const db = await Database.load("sqlite:budget.db");
            const result: Envelope[] = await db.select("SELECT * FROM envelopes ORDER BY ordering");
            result.sort((a, b) => a.ordering - b.ordering);
            console.log("Fetched Envelopes: ", result);
            setData(result);
            debug("Fetched Data: " + JSON.stringify(result));
        }
        fetchData();
    }, []);

    useEffect(() => {
        setTotal(data.reduce((acc: number, item: any) => acc + item.balance, 0));
    }, [data]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 5px 0px 5px',
                    borderBottom: '1px solid #ccc'
                }}
            >
                <Typography variant="caption" fontWeight="bold">
                    Biweekly
                </Typography>
                <Typography variant="caption">
                    Total: ${total.toFixed(2)}
                </Typography>
            </Box>
            {data.map((data: any, index: number) => (
                <EnvelopeElm key={index} data={data} />
            ))}
        </>
    );
}