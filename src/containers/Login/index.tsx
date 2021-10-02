import React from "react";

import GoogleButton from "src/components/Button/GoogleButton";

import loginImg from "../../assets/login.jpg";

import { Grid, Box } from "@mui/material";
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
                <Grid item xs={6} sx={{ display: "flex", flexDirection: "row" }}>
                    <Box>
                        <GoogleButton
                            variant="outlined"
                            onClick={() => login(googleProvider)}
                            fullWidth
                        >
                            Google
                        </GoogleButton>
                    </Box>
                    <Box>
                        <GoogleButton
                            variant="outlined"
                            onClick={() => login(facebookProvider)}
                            fullWidth
                        >
                            Facebook
                        </GoogleButton>
                    </Box>
                </Grid>
                <Grid item xs={6}></Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Login;
