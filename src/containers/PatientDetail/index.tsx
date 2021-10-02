import React, { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router";
import axios from "src/axios";

import { ConfirmModal } from "src/components/ConfirmModal";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { Account } from "../AccountManagement/models/Account.model";
import { Patient } from "./models/Patient.model";

import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import {
    Button,
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    List,
    Icon,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { Box } from "@mui/system";

const PatientDetail: React.FC = () => {
    const showSnackbar = useSnackbar();
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<string | false>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [account, setAccount] = useState<Account>();
    const [patient, setPatient] = useState<Patient>();

    const params = useParams<{ id: string }>();
    const accountId = params.id;

    const convertDate = (input: string) => {
        let date = input?.slice(0, 10);
        const [year, month, day] = date?.split("-");
        date = day + "/" + month + "/" + year;
        return date;
    };

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleCloseConfirmModal = async (
        e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
        action: "CONFIRM" | "CANCEL"
    ) => {
        if (action === "CONFIRM") {
            try {
                const response = await axios.put("/accounts/change-status/" + accountId);
                if (response.status === 200) {
                    setIsActive(!isActive);
                    showSnackbar({
                        children: "Cập nhật trạng thái tài khoản thành công",
                        variant: "filled",
                        severity: "success",
                    });
                }
            } catch (error) {
                showSnackbar({
                    children: "Cập nhật trạng thái tài khoản thất bại",
                    variant: "filled",
                    severity: "error",
                });
            }
        }
        setIsOpenConfirmModal(false);
    };

    const toggleBtnActive = () => {
        setIsOpenConfirmModal(true);
    };

    const getAccountById = useCallback(async (accountId) => {
        setLoading(true);
        try {
            const response = await axios.get("/accounts/" + accountId);
            if (response.status === 200) {
                const data: Account = response.data;
                const convertedDob = convertDate(data.dob);
                const accountRes: Account = { ...data, dob: convertedDob };
                setIsActive(accountRes.active);
                setAccount(accountRes);

                const res = await axios.get("/patients/email/" + accountRes.email);
                if (res.status === 200) {
                    setPatient(res.data);
                }
            }
        } catch (_error) {}
    }, []);

    useEffect(() => {
        getAccountById(accountId);
    }, [accountId, getAccountById]);

    let genderIcon = (
        <Icon color="primary" sx={{ fontSize: 30 }}>
            male_outlined_icon
        </Icon>
    );
    if (!loading && !account?.isMale) {
        genderIcon = <Icon sx={{ color: pink[500], fontSize: 30 }}>female_outlined_icon</Icon>;
    }
    const profile = (
        <Card>
            <CardContent sx={{ height: 560 }}>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Avatar
                        src={account?.avatar}
                        sx={{
                            height: 100,
                            width: 100,
                        }}
                    />
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        {genderIcon}
                        <Typography color="textPrimary" gutterBottom variant="h5">
                            {`${account?.firstName} ${account?.lastName}`}
                        </Typography>
                    </Box>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <BloodtypeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={patient?.bloodGroup} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CakeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={account?.dob} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PhoneOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={account?.phone} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EmailOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={account?.email} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={`${account?.streetAddress}, ${account?.locality}, ${account?.city}`}
                            />
                        </ListItem>
                    </List>
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    color={isActive ? "error" : "success"}
                    fullWidth
                    variant="text"
                    onClick={toggleBtnActive}
                >
                    {isActive ? "Khóa tài khoản" : "Kích hoạt tài khoản"}
                </Button>
            </CardActions>
        </Card>
    );

    const healthInfo = (
        <Card>
            <CardHeader title="Thông tin về sức khỏe" />
            <Divider />
            <CardContent>
                {/* Allery Expand */}
                <Accordion
                    expanded={expanded === "alleryPanel"}
                    onChange={handleChange("alleryPanel")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="allery-panel-content"
                        id="allery-panel-header"
                    >
                        <Typography sx={{ width: "1/3", flexShrink: 0 }}>Tiền sử dị ứng</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ color: "text.secondary" }}>{patient?.allergy}</Typography>
                    </AccordionDetails>
                </Accordion>
                {/* Background Disease Expand */}
                <Accordion
                    expanded={expanded === "bkgDiseasePanel"}
                    onChange={handleChange("bkgDiseasePanel")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="bkg-disease-panel-content"
                        id="bkg-disease-panel-header"
                    >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            Danh sách bệnh nền
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ color: "text.secondary" }}>
                            {patient?.backgroundDisease}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    );

    const consultingHistory = (
        <Card>
            <CardHeader title="Lịch sử đăng ký tư vấn khám chữa bệnh" />
            <Divider />
            <CardContent>
                {[1, 2, 3, 4].map((item) => (
                    <Card
                        key={item}
                        variant="outlined"
                        sx={{ display: "flex", flexDirection: "row", pr: 2 }}
                    >
                        <CardContent sx={{ display: "flex", flexWrap: "wrap", p: 2 }}>
                            <Typography component="div" sx={{ mr: 1 }} color="text.secondary">
                                Bác sĩ tư vấn
                            </Typography>
                            <Typography component="div" sx={{ mr: 5 }}>
                                Nguyễn Trang
                            </Typography>
                            <Typography component="div" sx={{ mr: 1 }} color="text.secondary">
                                Ngày đăng kí
                            </Typography>
                            <Typography component="div" sx={{ mr: 5 }}>
                                01/01/2011
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Chip color="success" label="Hoàn thành" size="small" />
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Chi tiết</Button>
                        </CardActions>
                    </Card>
                ))}
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                <Button size="small" disabled={patient?.healthChecks?.length === 0}>
                    Xem thêm...
                </Button>
            </Box>
        </Card>
    );

    return (
        <React.Fragment>
            <ConfirmModal
                open={isOpenConfirmModal}
                message={`Bạn có muốn ${isActive ? "khóa" : "kích hoạt"} tài khoản này không?`}
                handleClose={handleCloseConfirmModal}
            />
            <Box sx={{ backgroundColor: "background.default", minHeight: "100%", py: 3 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item lg={4} md={6} xs={12}>
                            {profile}
                        </Grid>
                        <Grid item lg={8} md={6} xs={12}>
                            <Box>{healthInfo}</Box>
                            <Box sx={{ mt: 3 }}>{consultingHistory}</Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default PatientDetail;
