import React, { useCallback, useEffect, useState } from "react";

import { useHistory, useParams } from "react-router";
import axios from "src/axios";

import HealthCheckDisease from "./components/HealthCheckDisease";
import PatientHealthInfomation from "./components/PatientHealthCheckInfor";
import PatientInformation from "./components/PatientInfor";
import Prescription from "./components/Prescription";
import Slot from "./components/Slot";
import SymptomHealthCheck from "./components/SymptomHealthCheck";

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

const HealthCheckDetail: React.FC = () => {
    const history = useHistory();
    const [patient, setPatient] = useState<Patient>();
    const [healthCheckDiseases, setHealthCheckDiseases] = useState<HealthCheckDiseases[]>([]);
    const [prescription, setPrescription] = useState<Prescriptions[]>([]);
    const [slot, setSlot] = useState<Slots[]>([]);
    const [symptomHealthCheck, setSymptomHealthChecks] = useState<SymptomHealthChecks[]>([]);
    const [healthcheck, setHealthcheck] = useState<HealthCheck>();
    const params = useParams<{ id: string }>();
    const id = params.id;

    const getHealthCheckById = useCallback(
        async (id) => {
            try {
                const response = await axios.get(`/health-checks/${id}`);
                if (response.status === 200) {
                    setHealthcheck(response.data);
                    setPatient(response.data?.patient);
                    setHealthCheckDiseases(response.data?.healthCheckDiseases);
                    // eslint-disable-next-line no-console
                    console.log(response.data);
                    setPrescription(response.data?.prescriptions);
                    setSlot(response.data?.slots);
                    setSymptomHealthChecks(response.data?.symptomHealthChecks);
                }
            } catch (_error) {
                history.push("/not-found");
            }
        },
        [history]
    );

    useEffect(() => {
        getHealthCheckById(id);
    }, [id, getHealthCheckById]);

    return (
        <React.Fragment>
            <Box sx={{ backgroundColor: "background.default", minHeight: "100%", py: 3 }}>
                <Typography variant="h4" gutterBottom component="div">
                    <Box sx={{ textAlign: "center", m: 1 }}>Thông tin kiểm tra sức khỏe</Box>
                </Typography>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} xs={12}>
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
                                    email={patient?.email}
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
