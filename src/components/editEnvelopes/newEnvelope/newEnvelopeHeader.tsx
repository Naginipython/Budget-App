import { ArrowBack, Check } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface NewEnvelopeHeaderProps {
    onSave: () => void;
}

export default function ({ onSave }: NewEnvelopeHeaderProps) {
    const navigate = useNavigate();
    return (
        <AppBar position="static" sx={{ backgroundColor: "green" }}>
            <Toolbar disableGutters={true} sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="back"
                    onClick={() => navigate(-1)}
                >
                    <ArrowBack sx={{ fontSize: 30 }} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Edit Envelopes
                </Typography>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="save"
                    onClick={onSave}
                >
                    <Check sx={{ fontSize: 30 }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}