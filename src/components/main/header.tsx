import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function () {
    let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    return (
        <AppBar position="static" sx={{ backgroundColor: "green" }}>
            <Toolbar disableGutters={true} sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Budget
                </Typography>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="add"
                >
                    <AddCircle sx={{ fontSize: 30 }} onClick={async () => {navigate("/add")}} />
                </IconButton>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="more"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                    <MoreVert sx={{ fontSize: 30 }} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem onClick={() => { setAnchorEl(null); /* handle action */ }}>Envelopes Transfer</MenuItem>
                    <MenuItem onClick={async () => { setAnchorEl(null); await navigate("/edit-envelopes") }}>Edit Envelopes</MenuItem>
                    <MenuItem onClick={() => { setAnchorEl(null); /* handle action */ }}>Settings</MenuItem>
                    <MenuItem onClick={async () => { setAnchorEl(null); await navigate("/test") }}>Test</MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    );
}