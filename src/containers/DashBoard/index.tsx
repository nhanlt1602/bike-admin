import React from "react";

import DashBoardItem from "./components";
import { Box, Container, Typography } from "@material-ui/core";

import { mainDashBoard } from "./data";

import { Grid } from "@mui/material";

const DashBoard = () => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ pb: 5 }}>
                <Typography variant="h4">Hi, Welcome back</Typography>
            </Box>
            <Grid container spacing={3}>
                {mainDashBoard?.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <DashBoardItem name={item.name} icon={item.icon} path={item.path} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default DashBoard;
