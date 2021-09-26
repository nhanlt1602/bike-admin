import React from "react";

import { Divider, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";

function CustomSidebar() {
    return (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Telemedicine
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {["Dashboard", "Doctors", "Patients", "Hospitals", "Symptoms"].map(
                    (text: string, index: number) => (
                        <ListItem button key={index}>
                            <ListItemText primary={text} />
                        </ListItem>
                    )
                )}
            </List>
        </div>
    );
}

export default CustomSidebar;
