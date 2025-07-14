import { Box, Typography } from '@mui/material';
import Envelope from './envelope';
import { useEffect, useState } from 'react';

export default function () {
    const [data, setData] = useState<any>([]);
    const [total, setTotal] = useState<number>(0);
    useEffect(() => {
        setData([
            { name: 'Groceries', balance: 25, limit: 50 },
            { name: 'Gas', balance: 25, limit: 50 },
            { name: 'Entertainment', balance: 25, limit: 50 },
            { name: 'Rent', balance: 25, limit: 50 },
            { name: 'Utilities', balance: 25, limit: 50 },
            { name: 'Misc', balance: 25, limit: 50 },
        ]);
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
                <Envelope key={index} data={data} />
            ))}
        </>
    );
}