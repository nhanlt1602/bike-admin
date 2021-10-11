import React, { useCallback, useEffect, useState } from "react";

import moment from "moment";
import { useHistory, useParams } from "react-router";
import axios from "src/axios";

import Prescription from "./components/Prescription";

import { Patient } from "../PatientDetail/models/Patient.model";
import {
    HealthCheck,
    HealthCheckDiseases,
    Prescriptions,
    Slots,
    SymptomHealthChecks,
} from "./models/HealthCheckDetail.model";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { red, yellow } from "@mui/material/colors";
import { Box } from "@mui/system";

const HealthCheckDetail: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
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
                setLoading(true);
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
                setLoading(false);
                history.push("/not-found");
            } finally {
                setLoading(false);
            }
        },
        [history]
    );

    useEffect(() => {
        getHealthCheckById(id);
    }, [id, getHealthCheckById]);

    const renderStatus = (status?: string) => {
        switch (status) {
            case "COMPLETED":
                return (
                    <Box display="flex" width={1} justifyContent="center" alignItems="center">
                        <Box>
                            <Box sx={{ textAlign: "center", m: 1 }}>
                                <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
                            </Box>
                            <Typography variant="h6" gutterBottom component="div">
                                <Box sx={{ textAlign: "center", m: 1 }}>
                                    Buổi tư vấn đã diễn ra thành công
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                );
            case "CANCELED":
                return (
                    <Box display="flex" width={1} justifyContent="center" alignItems="center">
                        <Box>
                            <Box sx={{ textAlign: "center", m: 1 }}>
                                <CancelIcon sx={{ fontSize: 60, color: red[500] }} />
                            </Box>
                            <Typography variant="h6" gutterBottom component="div">
                                <Box sx={{ textAlign: "center", m: 1 }}>Buổi tư vấn đã bị hủy</Box>
                            </Typography>
                        </Box>
                    </Box>
                );
            case "BOOKED":
                return (
                    <Box display="flex" width={1} justifyContent="center" alignItems="center">
                        <Box>
                            <Box sx={{ textAlign: "center", m: 1 }}>
                                <WatchLaterIcon sx={{ fontSize: 60, color: yellow[700] }} />
                            </Box>
                            <Typography variant="h6" gutterBottom component="div">
                                <Box sx={{ textAlign: "center", m: 1 }}>
                                    Buổi tư vấn sắp diễn ra
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                );
            default:
                break;
        }
    };

    if (loading) {
        return (
            <Box width={1} minHeight="500px" alignItems="center" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    }
    return (
        <React.Fragment>
            <Box sx={{ backgroundColor: "background.default", minHeight: "100%", py: 3 }}>
                <Typography variant="h4" gutterBottom component="div">
                    <Box sx={{ textAlign: "center", m: 1 }}>Thông tin kiểm tra sức khỏe</Box>
                </Typography>
                {renderStatus(healthcheck?.status)}
                <Container maxWidth="lg">
                    <Card elevation={4}>
                        <CardContent>
                            <Grid container minHeight={35}>
                                <Grid item lg={4} md={4} xs={12}>
                                    Thời gian tư vấn:
                                </Grid>
                                <Grid item lg={8} md={8} xs={12}>
                                    {slot[0]?.startTime?.slice(0, 5)} {"-"}
                                    {slot[0]?.endTime?.slice(0, 5)} {"ngày "}
                                    {moment(slot[0]?.assignedDate).format(`DD/MM/YYYY`)}
                                </Grid>
                            </Grid>
                            <Grid container minHeight={35}>
                                <Grid item lg={4} md={4} xs={12}>
                                    Bệnh nhân:
                                </Grid>
                                <Grid item lg={8} md={8} xs={12}>
                                    {patient?.name}{" "}
                                    <Button
                                        onClick={() => {
                                            const win = window.open(
                                                `/patients/${patient?.email}`,
                                                "_blank"
                                            );
                                            win?.focus();
                                        }}
                                        size="small"
                                    >
                                        CHI TIẾT
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container minHeight={35}>
                                <Grid item lg={4} md={4} xs={12}>
                                    Bác sĩ:
                                </Grid>
                                <Grid item lg={8} md={8} xs={12}>
                                    {slot[0]?.doctor?.name}{" "}
                                    <Button
                                        onClick={() => {
                                            const win = window.open(
                                                `/doctors/${slot[0]?.doctor?.email}`,
                                                "_blank"
                                            );
                                            win?.focus();
                                        }}
                                        size="small"
                                    >
                                        CHI TIẾT
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container minHeight={35}>
                                <Grid item lg={4} md={4} xs={12}>
                                    Triệu chứng hiện tại:
                                </Grid>
                                <Grid item lg={8} md={8} xs={12}>
                                    {!symptomHealthCheck || symptomHealthCheck.length === 0 ? (
                                        <Typography>Chưa có triệu chứng gì</Typography>
                                    ) : (
                                        symptomHealthCheck.map((symptom) => {
                                            return (
                                                <Typography key={symptom?.id}>
                                                    {"-"} {symptom?.symptom?.name}
                                                </Typography>
                                            );
                                        })
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container minHeight={35}>
                                <Grid item lg={4} md={4} xs={12}>
                                    Chẩn đoán của bác sĩ:
                                </Grid>
                                <Grid item lg={8} md={8} xs={12}>
                                    {!healthCheckDiseases || healthCheckDiseases.length === 0 ? (
                                        <Typography>Chưa có cẩn đoán</Typography>
                                    ) : (
                                        healthCheckDiseases.map((disease) => {
                                            return (
                                                <Typography key={disease?.id}>
                                                    {"-"} {disease?.disease?.name}
                                                </Typography>
                                            );
                                        })
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container minHeight={35}>
                                <Grid item lg={4} md={4} xs={12}>
                                    Lời khuyên của bác sĩ:
                                </Grid>
                                <Grid item lg={8} md={8} xs={12}>
                                    {healthcheck?.advice}
                                </Grid>
                            </Grid>
                            <Grid container minHeight={35}>
                                Đơn thuốc
                            </Grid>
                            <Grid container minHeight={35}>
                                <Prescription prescriptions={prescription} />
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default HealthCheckDetail;
