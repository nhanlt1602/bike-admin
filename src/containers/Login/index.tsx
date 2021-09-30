import React from "react";

import GoogleButton from "src/components/Button/GoogleButton";

import { Grid, Typography, Box } from "@mui/material";
import useAuth, { googleProvider } from "src/hooks/useAuth";

const Login: React.FC = () => {
    const { login } = useAuth(googleProvider);
    return (
        <React.Fragment>
            <Grid
                container
                style={{ minHeight: "100vh" }}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        minWidth={300}
                        maxWidth={400}
                    >
                        <Typography variant="h3" color="primary">
                            Đăng nhập
                        </Typography>
                        <Box height={60} />
                        <GoogleButton variant="outlined" onClick={login} fullWidth>
                            Đăng nhập với Google
                        </GoogleButton>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Login;
