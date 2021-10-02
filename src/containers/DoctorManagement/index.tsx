import { useParams } from "react-router";

import { Box, Container, Grid } from "@material-ui/core";
import Certificate from "src/components/AccountProfile/Accorditon";
import AccountProfile from "src/components/AccountProfile/AccountProfile";

const Doctor = () => {
    const id = useParams<{ id: string }>();

    // useEffect(() => {
    //     const account = param.id;

    //     return () => {
    //         cleanup
    //     }
    // }, [])

    return (
        <>
            <Box
                sx={{
                    minHeight: "100%",
                    py: 3,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item lg={4} md={6} xs={12}>
                            <AccountProfile />
                        </Grid>
                        <Grid item lg={8} md={6} xs={12}>
                            {/* <AccountProfileDetails /> */}
                            <br />
                            <Certificate />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Doctor;
