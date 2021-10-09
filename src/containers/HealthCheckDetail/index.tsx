import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { useHistory, useParams } from "react-router";

import PatientHealthInfo from "../PatientDetail/components/PatientHealthInfo";
import PatientProfile from "../PatientDetail/components/PatientProfile";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { Account } from "../AccountManagement/models/Account.model";
import { Patient } from "../PatientDetail/models/Patient.model";
import {
    HealthCheckDiseases,
    Prescriptions,
    Slot,
    SymptomHealthChecks,
} from "./models/HealthCheckDetail.model";

import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Util from "src/utils/Util";

const HealthCheckDetail: React.FC = () => {
    const showSnackbar = useSnackbar();
    const history = useHistory();
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [account, setAccount] = useState<Account>();
    const [patient, setPatient] = useState<Patient>();
    const [healthCheckDisease, setHealthCheckDisease] = useState<HealthCheckDiseases[]>();
    const [prescription, setPrescription] = useState<Prescriptions[]>();
    const [slot, setSlot] = useState<Slot[]>();
    const [symptomHealthCheck, setSymptomHealthChecks] = useState<SymptomHealthChecks[]>();
    const params = useParams<{ id: string }>();
    const id = params.id;

    const toggleBtnActive = () => {
        setIsOpenConfirmModal(true);
    };

    const getHealthCheckById = useCallback(async (id) => {
        try {
            const response = await axios.get(`/health-checks/${id}`);
            console.log(response);
            if (response.status === 200) {
                const email = response.data.patient.email;
                console.log(response.data.patient.email);
                setPatient(response.data?.patient);
                setHealthCheckDisease(response.data?.healthCheckDiseases);
                setPrescription(response.data?.prescriptions);
                setSlot(response.data?.slots);
                setSymptomHealthChecks(response.data?.symptomHealthChecks);
                const res = await axios.get(`/accounts/${email}?search-type=Email`);
                if (res.status === 200) {
                    const data: Account = response.data;
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
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item lg={4} md={6} xs={12}>
                            <PatientProfile
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
                            />
                        </Grid>
                        <Grid item lg={8} md={6} xs={12}>
                            <Box>
                                <PatientHealthInfo
                                    allery={patient?.allergy}
                                    backgroundDisease={patient?.backgroundDisease}
                                />
                            </Box>
                            {/* <Box sx={{ mt: 3 }}>
                                <ConsultationHistory healthChecks={patient?.healthChecks} />
                            </Box> */}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default HealthCheckDetail;
