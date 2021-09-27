import React from "react";

import { Divider, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";

const CustomSidebar: React.FC = () => {
    return (
        <React.Fragment>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Telemedicine
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {[
                    "Trang chủ",
                    "Danh sách Bác sĩ",
                    "Danh sách Bệnh nhân",
                    "Danh sách Bệnh viện",
                    "Danh sách Triệu chứng",
                ].map((text: string, index: number) => (
                    <ListItem button key={index}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
};

export default CustomSidebar;
