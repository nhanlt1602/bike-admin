import React, { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router";
import axios from "src/axios";

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
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { Box } from "@mui/system";

const imgLink =
    "https://celebmafia.com/wp-content/uploads/2020/01/taylor-swift-variety-magazine-sundance-issue-2020-4.jpg";

// const account: Account = {
//     id: 13,
//     email: "taylor13@gmail.com",
//     firstName: "Taylor",
//     lastName: "Swift",
//     streetAddress: "21 W.",
//     locality: "46th St.",
//     city: "New York",
//     postalCode: "10001",
//     phone: "0891213001",
//     avatar: imgLink,
//     dob: "13/12/1989",
//     isMale: false,
//     active: true,
//     registerTime: "01/10/2021",
//     role: {
//         id: 1,
//         name: "patient",
//     },
// };

// const patient: Patient = {
//     backgroundDisease: "none",
//     allergy: "none",
//     bloodGroup: "O+",
//     healthChecks: [
//         { createdTime: "01/05/2021", doctorName: "Dr. Smith", status: "Đang đợi" },
//         { createdTime: "01/04/2021", doctorName: "Dr. Smith", status: "Hủy" },
//         { createdTime: "01/03/2021", doctorName: "Dr. Smith", status: "Kết thúc" },
//         { createdTime: "01/02/2021", doctorName: "Dr. Smith", status: "Hủy" },
//         { createdTime: "01/01/2021", doctorName: "Dr. Smith", status: "Kết thúc" },
//     ],
// };

const PatientDetail: React.FC = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [account, setAccount] = useState<Account>();
    const [patient, setPatient] = useState<Patient>();

    const params = useParams<{ id: string }>();
    const accountId = params.id;

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getAccountById = useCallback(async (accountId) => {
        setLoading(true);
        try {
            const response = await axios.get("/accounts/" + accountId);
            if (response.status === 200) {
                const accountRes: Account = response.data;
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
                            <ListItemText primary="O+" />
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
                <Button color={account?.active ? "error" : "success"} fullWidth variant="text">
                    {account?.active ? "Khóa tài khoản" : "Kích hoạt tài khoản"}
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
                {patient?.healthChecks?.map((item, index) => (
                    <Accordion
                        expanded={expanded === `healthCheck${index}`}
                        onChange={handleChange(`healthCheck${index}`)}
                        key={item}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`health-check${index}-panel-content`}
                            id={`health-check${index}-panel-header`}
                        >
                            <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                Bác sĩ tư vấn
                            </Typography>
                            <Typography sx={{ color: "text.secondary" }}>
                                {item.doctorName}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{`Ngày đăng ký: ${item.createdTime}`}</Typography>
                            <Typography sx={{ color: "text.secondary" }}>
                                {`Trạng thái: ${item.status}`}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                <Button size="small">Xem thêm...</Button>
            </Box>
        </Card>
    );

    return (
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
    );
};

export default PatientDetail;
