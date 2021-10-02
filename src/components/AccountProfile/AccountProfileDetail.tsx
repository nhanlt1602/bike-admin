import { ClassAttributes, FormHTMLAttributes, useState } from "react";

import { Card, CardContent, CardHeader, Divider, Grid, TextField } from "@material-ui/core";

const states = [
    {
        value: "alabama",
        label: "Alabama",
    },
    {
        value: "new-york",
        label: "New York",
    },
    {
        value: "san-francisco",
        label: "San Francisco",
    },
];

const AccountProfileDetails = (
    props: JSX.IntrinsicAttributes &
        ClassAttributes<HTMLFormElement> &
        FormHTMLAttributes<HTMLFormElement>
) => {
    const [values, setValues] = useState({
        firstName: "Katarina",
        lastName: "Smith",
        email: "demo@devias.io",
        phone: "",
        state: "Alabama",
        country: "USA",
    });

    const handleChange = (event: { target: { name: any; value: any } }) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <form autoComplete="off" noValidate {...props}>
            <Card>
                <CardHeader subheader="" title="Bệnh viện" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                helperText="Please specify the first name"
                                label="Chuyên ngành"
                                name="firstName"
                                onChange={handleChange}
                                required
                                value={values.firstName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                helperText="Please specify the first name"
                                label="Mô tả chuyên ngành"
                                name="firstName"
                                onChange={handleChange}
                                required
                                value={values.firstName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                helperText="Please specify the first name"
                                label="Trạng thái làm việc"
                                name="firstName"
                                onChange={handleChange}
                                required
                                value={values.firstName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                helperText="Please specify the first name"
                                label="Tên bệnh viện"
                                name="firstName"
                                onChange={handleChange}
                                required
                                value={values.firstName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Mã bệnh viện"
                                name="email"
                                onChange={handleChange}
                                required
                                value={values.email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Địa chỉ"
                                name="Mô tả"
                                onChange={handleChange}
                                required
                                value={values.lastName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Mô tả"
                                name="phone"
                                onChange={handleChange}
                                type="number"
                                value={values.phone}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                {/* <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                    }}
                >
                        <Button color="primary" variant="contained">
                            Save details
                        </Button>
                </Box> */}
            </Card>
        </form>
    );
};

export default AccountProfileDetails;
