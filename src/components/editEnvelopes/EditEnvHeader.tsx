import { ArrowBack } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";


export default function () {
    return (
        <AppBar position="static" sx={{ backgroundColor: "green" }}>
            <Toolbar disableGutters={true} sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="back"
                    onClick={() => window.history.back()}
                >
                    <ArrowBack sx={{ fontSize: 30 }} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Edit Envelopes
                </Typography>
            </Toolbar>
        </AppBar>
    );
}