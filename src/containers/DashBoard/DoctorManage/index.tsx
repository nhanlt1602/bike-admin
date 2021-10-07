import React from "react";

import DashBoardItem from "../components";
import { Box, Container, Typography } from "@material-ui/core";

import { doctorManageItems } from "../data";

import { Grid } from "@mui/material";

const DoctorManage = () => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ pb: 5 }}>
                <Typography variant="h4">Quản lí cấu hình bác sĩ</Typography>
            </Box>
            <Grid container spacing={3}>
                {doctorManageItems?.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <DashBoardItem name={item.name} icon={item.icon} path={item.path} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default DoctorManage;
