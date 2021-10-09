import React, { useCallback, useEffect, useState } from "react";

import { useHistory, useParams } from "react-router";
import axios from "src/axios";

// import { API_ROOT_URL } from "src/configurations";
// import PatientProfile from "../PatientDetail/components/PatientProfile";
import HealthCheckDisease from "./components/HealthCheckDisease";
import PatientHealthInfomation from "./components/PatientHealthCheckInfor";
import PatientInformation from "./components/PatientInfor";
import Prescription from "./components/Prescription";
import Slot from "./components/Slot";
import SymptomHealthCheck from "./components/SymptomHealthCheck";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { Account } from "../AccountManagement/models/Account.model";
import { Patient } from "../PatientDetail/models/Patient.model";
import {
    HealthCheck,
    HealthCheckDiseases,
    Prescriptions,
    Slots,
    SymptomHealthChecks,
} from "./models/HealthCheckDetail.model";

import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Util from "src/utils/Util";

const HealthCheckDetail: React.FC = () => {
    const showSnackbar = useSnackbar();
    const history = useHistory();
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [account, setAccount] = useState<Account>();
    const [patient, setPatient] = useState<Patient>();
    const [healthCheckDiseases, setHealthCheckDiseases] = useState<HealthCheckDiseases[]>([]);
    const [prescription, setPrescription] = useState<Prescriptions[]>([]);
    const [slot, setSlot] = useState<Slots[]>([]);
    const [symptomHealthCheck, setSymptomHealthChecks] = useState<SymptomHealthChecks[]>([]);
    const [healthcheck, setHealthcheck] = useState<HealthCheck>();
    const params = useParams<{ id: string }>();
    const id = params.id;

    const toggleBtnActive = () => {
        setIsOpenConfirmModal(true);
    };

    const getHealthCheckById = useCallback(async (id) => {
        try {
            console.log(id);
            const response = await axios.get(`/health-checks/${id}`);
            // const response = await fetch(`${API_ROOT_URL}/health-checks/${id}`, {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${LocalStorageUtil.getToken()}`,
            //         // 'Content-Type': 'application/x-www-form-urlencoded',
            //     },
            // });
            // const data = await response.json();
            // console.log(data);
            // console.log(response);
            if (response.status === 200) {
                const email = response.data.patient.email;

                setHealthcheck(response.data);
                setPatient(response.data?.patient);
                setHealthCheckDiseases(response.data?.healthCheckDiseases);
                console.log(response.data?.healthCheckDiseases);
                setPrescription(response.data?.prescriptions);
                setSlot(response.data?.slots);
                setSymptomHealthChecks(response.data?.symptomHealthChecks);
                const res = await axios.get(`/accounts/${email}?search-type=Email`);

                if (res.status === 200) {
                    const data: Account = res.data;
                    const convertedDob = Util.convertDate(data.dob);
                    const accountRes: Account = { ...data, dob: convertedDob };
                    setIsActive(accountRes.active);
                    setAccount(accountRes);
                }
            }
        } catch (_error) {
            // history.push("/not-found");
        }
    }, []);
    // const getAccountById = useCallback(
    //     async (id) => {
    //         try {
    //             const response = await axios.get(`/accounts/${email}?search-type=Email`);
    //             if (response.status === 200) {
    //                 const data: Account = response.data;
    //                 const convertedDob = Util.convertDate(data.dob);
    //                 const accountRes: Account = { ...data, dob: convertedDob };
    //                 setIsActive(accountRes.active);
    //                 setAccount(accountRes);

    //                 const res = await axios.get(`/patients/${email}?search-type=Email`);
    //                 if (res.status === 200) {
    //                     setPatient(res.data);
    //                 }
    //             }
    //         } catch (_error) {
    //             history.push("/not-found");
    //         }
    //     },
    //     [history]
    // );

    useEffect(() => {
        getHealthCheckById(id);
    }, [id, getHealthCheckById]);

    return (
        <React.Fragment>
            <Box sx={{ backgroundColor: "background.default", minHeight: "100%", py: 3 }}>
                <Typography variant="h3" gutterBottom component="div">
                    <Box sx={{ textAlign: "center", m: 1 }}>Thông tin kiểm tra sức khỏe</Box>
                </Typography>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} xs={12}>
                            {/* <PatientProfile
                                isMale={account?.isMale}
                                avatar={account?.avatar}
                                fullName={`${account?.firstName} ${account?.lastName}`}
                                bloodGroup={patient?.bloodGroup}
                                dob={account?.dob}
                                phone={account?.phone}
                                email={account?.email}
                                address={`${account?.streetAddress}, ${account?.locality}, ${account?.city}`}
                                isActive={isActive}
                                clicked={toggleBtnActive}
                            /> */}
                            <Box>
                                <PatientInformation
                                    height={healthcheck?.height}
                                    weight={healthcheck?.weight}
                                    reasonCancel={healthcheck?.reasonCancel}
                                    rating={healthcheck?.rating}
                                    comment={healthcheck?.comment}
                                    advice={healthcheck?.advice}
                                    createTime={healthcheck?.createdTime}
                                    canceledTime={healthcheck?.canceledTime}
                                />
                            </Box>

                            <Box sx={{ m: 2 }} />
                            <Box>
                                <HealthCheckDisease healthCheckDisease={healthCheckDiseases} />
                            </Box>
                            <Box sx={{ m: 2 }} />
                            <Box>
                                <SymptomHealthCheck symptomHealthChecks={symptomHealthCheck} />
                            </Box>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                            {/* <Card>
                                <CardHeader title="Thông tin về sức khỏe" />
                                <Divider />
                                <CardContent> */}
                            <Box>
                                <PatientHealthInfomation
                                    allery={patient?.allergy}
                                    backgroundDisease={patient?.backgroundDisease}
                                />
                            </Box>
                            <Box sx={{ m: 2 }} />
                            <Box>
                                <Slot slots={slot} />
                            </Box>
                            <Box sx={{ m: 2 }} />
                            <Box>
                                <Prescription prescriptions={prescription} />
                            </Box>

                            {/* </CardContent>
                            </Card> */}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default HealthCheckDetail;
