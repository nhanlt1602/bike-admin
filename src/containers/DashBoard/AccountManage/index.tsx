import React from "react";

import DashBoardItem from "../components";
import { Box, Container, Typography } from "@material-ui/core";

import { accountManageItems } from "../data";

import { Grid } from "@mui/material";

const AccountManage = () => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ pb: 5 }}>
                <Typography variant="h4">Quản lí tài khoản</Typography>
            </Box>
            <Grid container spacing={3}>
                {accountManageItems?.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <DashBoardItem name={item.name} icon={item.icon} path={item.path} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AccountManage;
