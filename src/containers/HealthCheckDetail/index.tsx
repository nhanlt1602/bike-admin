import React, { useCallback, useEffect, useState } from "react";

import moment from "moment";
import { useHistory, useParams } from "react-router";
import axios from "src/axios";

import DrugDialog from "./components/DrugDialog";

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
    CardHeader,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Rating,
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
    const [open, setOpen] = useState<boolean>(false);

    const onHandleClose = () => {
        setOpen(false);
    };

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
            <Box sx={{ backgroundColor: "background.default", minHeight: "100%" }}>
                <Typography variant="h4" gutterBottom component="div">
                    <Box sx={{ textAlign: "center" }}>Thông tin kiểm tra sức khỏe</Box>
                </Typography>
                {renderStatus(healthcheck?.status)}
                <Container maxWidth="lg">
                    <Grid alignItems="stretch" container spacing={2}>
                        <Grid item lg={6} md={6} xs={12}>
                            <Card sx={{ height: "100% !important" }}>
                                <CardHeader
                                    title={<Typography variant="h6">Thông tin cuộc hẹn</Typography>}
                                ></CardHeader>
                                <Divider />
                                <CardContent>
                                    <Grid container minHeight={35}>
                                        <Grid item lg={4} md={4} xs={12}>
                                            Thời gian tư vấn:
                                        </Grid>
                                        <Grid item lg={8} md={8} xs={12}>
                                            {slot[0]?.startTime?.slice(0, 5)} {"- "}
                                            {slot[0]?.endTime?.slice(0, 5)}{" "}
                                            {moment(slot[0]?.assignedDate).format(`DD/MM/YYYY`)}
                                        </Grid>
                                    </Grid>
                                    <Grid container minHeight={35}>
                                        <Grid item lg={4} md={4} xs={12}>
                                            Bệnh nhân:
                                        </Grid>
                                        <Grid item lg={4} md={4} xs={12}>
                                            {patient?.name}{" "}
                                        </Grid>
                                        <Grid item lg={4} md={4} xs={12}>
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
                                        <Grid item lg={4} md={4} xs={12}>
                                            {slot[0]?.doctor?.name}{" "}
                                        </Grid>
                                        <Grid item lg={4} md={4} xs={12}>
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
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                            <Card sx={{ height: "100% !important" }}>
                                <CardHeader
                                    title={
                                        <Typography variant="h6">Nội dung buổi tư vấn</Typography>
                                    }
                                ></CardHeader>
                                <Divider />
                                <CardContent>
                                    {healthcheck?.status === "COMPLETED" ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                Buổi tư vấn chưa diễn ra
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <React.Fragment>
                                            <Grid container minHeight={35}>
                                                <Grid item lg={4} md={4} xs={12}>
                                                    Chẩn đoán của bác sĩ:
                                                </Grid>
                                                <Grid item lg={8} md={8} xs={12}>
                                                    {!healthCheckDiseases ||
                                                    healthCheckDiseases.length === 0 ? (
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
                                                    Ghi chú của bác sĩ:
                                                </Grid>
                                                <Grid item lg={8} md={8} xs={12}>
                                                    {healthcheck?.advice || "Không có"}
                                                </Grid>
                                            </Grid>
                                            <Grid container minHeight={35}>
                                                <Grid item lg={4} md={4} xs={12}>
                                                    Xem đơn thuốc:
                                                </Grid>
                                                <Grid item lg={8} md={8} xs={12}>
                                                    <Button
                                                        size="small"
                                                        onClick={() => setOpen(true)}
                                                    >
                                                        Xem
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Box height={10}></Box>
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} xs={12}>
                            <Card sx={{ height: "100% !important" }}>
                                <CardHeader
                                    title={
                                        <Typography variant="h6">Tình trạng bệnh nhân</Typography>
                                    }
                                ></CardHeader>
                                <Divider />
                                <CardContent>
                                    <Grid container minHeight={35}>
                                        <Grid item lg={3} md={3} xs={12}>
                                            Nhóm máu:
                                        </Grid>
                                        <Grid item lg={9} md={9} xs={12}>
                                            {patient?.bloodGroup}
                                        </Grid>
                                    </Grid>
                                    <Grid container minHeight={35}>
                                        <Grid item lg={3} md={3} xs={6}>
                                            Chiều cao:
                                        </Grid>
                                        <Grid item lg={3} md={3} xs={6}>
                                            {(healthcheck?.height || 0) / 100}m
                                        </Grid>
                                        <Grid item lg={3} md={3} xs={6}>
                                            Cân nặng:
                                        </Grid>
                                        <Grid item lg={3} md={3} xs={6}>
                                            {healthcheck?.weight}kg
                                        </Grid>
                                    </Grid>
                                    <Grid container minHeight={35}>
                                        <Grid item lg={3} md={3} xs={12}>
                                            Tiền sử dị ứng:
                                        </Grid>
                                        <Grid item lg={9} md={9} xs={12}>
                                            {patient?.allergy || "Không có"}
                                        </Grid>
                                    </Grid>
                                    <Grid container minHeight={35}>
                                        <Grid item lg={3} md={9} xs={12}>
                                            Bệnh nền:
                                        </Grid>
                                        <Grid item lg={3} md={9} xs={12}>
                                            {patient?.backgroundDisease || "Không có"}
                                        </Grid>
                                    </Grid>
                                    <Grid container minHeight={35}>
                                        <Grid item lg={3} md={3} xs={12}>
                                            Các triệu chứng:
                                        </Grid>
                                        <Grid item lg={9} md={9} xs={12}>
                                            {!symptomHealthCheck ||
                                            symptomHealthCheck.length === 0 ? (
                                                <Typography>Chưa có triệu chứng</Typography>
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
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                            <Card sx={{ height: "100% !important" }}>
                                <CardHeader
                                    title={
                                        <Typography variant="h6">Đánh giá về cuộc hẹn</Typography>
                                    }
                                ></CardHeader>
                                <Divider />
                                <CardContent>
                                    {healthcheck?.status !== "COMPLETED" ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                Buổi tư vấn chưa diễn ra
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <React.Fragment>
                                            <Grid container minHeight={35}>
                                                <Grid item lg={4} md={4} xs={12}>
                                                    Đánh giá:
                                                </Grid>
                                                <Grid item lg={8} md={8} xs={12}>
                                                    <Rating
                                                        name="rating"
                                                        value={healthcheck?.rating || 0}
                                                        readOnly
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container minHeight={35}>
                                                <Grid item lg={4} md={4} xs={12}>
                                                    Feedback:
                                                </Grid>
                                                <Grid item lg={8} md={8} xs={12}>
                                                    {healthcheck?.comment || "Không có"}
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <DrugDialog open={open} handleClose={onHandleClose} prescription={prescription} />
        </React.Fragment>
    );
};

export default HealthCheckDetail;

{
    /* <React.Fragment>
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
        </React.Fragment> */
}
