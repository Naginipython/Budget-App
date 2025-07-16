import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function({ key, data }: { key: number, data: any }) {
    const navigate = useNavigate();
    const progressBarVal = (data.balance/data.balance_limit) * 100;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px 10px',
                borderBottom: '1px solid #ccc',
                cursor: 'pointer'
            }}
            onClick={() => navigate(`/transactions/${key}`)}
        >

            <Grid container sx={{ flex: 1 }}>
                <Grid size={11}>
                    <Typography variant="body1" fontWeight="bold">
                        {data.title}
                    </Typography>
                    <Box sx={{ height: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                        <LinearProgress variant="determinate" color="success" value={progressBarVal} sx={{ height: '100%' }} />
                    </Box>
                </Grid>
                <Grid size={1} sx={{ textAlign: 'right' }}>
                    <Typography variant="body1" fontWeight="bold" color="textPrimary" sx={{ margin: 0 }}>
                    {data.balance.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ margin: 0 }}>
                        {data.balance_limit.toFixed(2)}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}