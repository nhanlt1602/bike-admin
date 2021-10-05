import React from "react";

import FacebookButton from "src/components/Button/FacebookButton";
import GoogleButton from "src/components/Button/GoogleButton";

import loginImg from "../../assets/login.jpg";

import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useAuth, { facebookProvider, googleProvider } from "src/hooks/useAuth";

const Login: React.FC = () => {
    const { login } = useAuth();
    return (
        <React.Fragment>
            <Grid
                container
                style={{
                    minHeight: "100vh",
                    backgroundImage: `url(${loginImg})`,
                    backgroundSize: "100% 100%",
                }}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={6} pt="6">
                    <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <span style={{ fontFamily: "Philosopher", fontSize: 100 }}>
                            Telemedicine
                        </span>
                    </Grid>
                    <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="overline" fontSize="20px">
                            Bắt đầu ứng dụng với
                        </Typography>
                    </Grid>
                    <Grid
                        xs={12}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            m: 3,
                        }}
                    >
                        <Box sx={{ width: 140, pr: 3 }}>
                            <GoogleButton
                                variant="outlined"
                                fullWidth
                                onClick={() => login(googleProvider)}
                            >
                                Google
                            </GoogleButton>
                        </Box>
                        <Box sx={{ width: 140 }}>
                            <FacebookButton
                                variant="outlined"
                                fullWidth
                                onClick={() => login(facebookProvider)}
                            >
                                Facebook
                            </FacebookButton>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={6}></Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Login;
