import React, { useCallback, useEffect, useState } from "react";

import Moment from "moment";
import { useParams } from "react-router";
import axios from "src/axios";
import { API_ROOT_URL } from "src/configurations";

import { Box } from "@material-ui/core";

import { Account } from "../AccountManagement/models/Account.model";
import { Cetification } from "../Cetifcation/Cetification.model";
import { Doctors } from "./models/Doctor.model";

import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { Accordion } from "@mui/material";
import {
    Button,
    Avatar,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Grid,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    List,
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// import { Cetification } from "src/containers/Cetifcation/Cetification.model";

const imgLink =
    "https://afamilycdn.com/150157425591193600/2020/10/19/base64-16030963538052065905430.png";

const account: Account = {
    id: 13,
    email: "taylor13@gmail.com",
    firstName: "Phạm",
    lastName: "Thu Hà",
    streetAddress: "21 W.",
    locality: "46th St.",
    city: "New York",
    postalCode: "10001",
    phone: "0891213001",
    avatar: imgLink,
    dob: "13/12/1989",
    isMale: false,
    active: true,
    registerTime: "01/10/2021",
    role: {
        id: 2,
        name: "patient",
    },
};

const DoctorDetails: React.FC = () => {
    const id = useParams<{ id: string }>();
    const [cetifi, setCetifi] = useState<Cetification>();
    const [expanded, setExpanded] = React.useState<string | false>("panel1");
    const [loading, setLoading] = useState<boolean>(false);
    const [account, setAccount] = useState<Account>();
    const [doctor, setDoctor] = useState<Doctors>();
    const [verifyDoctor, setVerifyDoctor] = useState<boolean>(false);
    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClick = () => (event: React.SyntheticEvent) => {
        verifyAccount(accountId);
    };

    const params = useParams<{ id: string }>();
    const accountId = params.id;

    const getAccountById = useCallback(async (accountId) => {
        setLoading(true);
        try {
            const response = await axios.get("/accounts/" + accountId);
            if (response.status === 200) {
                const accountRes: Account = response.data;
                // console.log(accountRes);
                setAccount(accountRes);
                // setDoctor(accountRes);
                // setCetifi(response.data.cetificationDoctors);
                const res = await axios.get("/doctors/email/" + "Nhannt@gmail.com");
                if (res.status === 200) {
                    console.log(res.data);
                    setDoctor(res.data);
                    // setCetifi(res.data.cetificationDoctors);
                }
            }
        } catch (_error) {}
    }, []);
    const verifyAccount = useCallback(async (accountId) => {
        setLoading(true);
        try {
            const response = await axios.patch(`${API_ROOT_URL}/doctors/` + accountId);
            if (response.status === 200) {
                console.log(response.data.message);
                // if(response.dât)
                if (response.data.message === "success") {
                    setVerifyDoctor(true);
                }
            }
        } catch (_error) {}
    }, []);

    useEffect(() => {
        getAccountById(accountId);
        // verifyAccount(accountId);
    }, [accountId, getAccountById]);

    const profile = (
        <Card>
            <CardContent sx={{ height: 450 }}>
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
                        {/* {genderIcon} */}
                        <Typography color="textPrimary" gutterBottom variant="h5">
                            Mr. {`${account?.firstName} ${account?.lastName}`}
                        </Typography>
                    </Box>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <CakeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={Moment(account?.dob).format("d MMM yy")} />
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
                <Button
                    color={verifyDoctor ? "error" : "success"}
                    fullWidth
                    variant="text"
                    onClick={handleClick()}
                >
                    {verifyDoctor ? "Chưa xác thực" : "Xác thực"}
                </Button>
            </CardActions>
        </Card>
    );

    const doctorProfile = (
        <form autoComplete="off" noValidate>
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography>Thông tin hành nghề</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <Typography color="textPrimary" gutterBottom>
                                Chứng chỉ hành nghề: {doctor?.practisingCertificate}
                            </Typography>
                            <Typography color="textPrimary" gutterBottom>
                                Mã chứng chỉ: {doctor?.practisingCertificate}
                            </Typography>
                            <Typography color="textPrimary" gutterBottom>
                                Nơi cấp chứng chỉ: {doctor?.practisingCertificate}
                            </Typography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography color="textPrimary" gutterBottom>
                                Phạm vi thực hành: {doctor?.practisingCertificate}
                            </Typography>
                            <Typography color="textPrimary" gutterBottom>
                                Số lượng người tư vấn: {doctor?.practisingCertificate}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography color="textPrimary" gutterBottom>
                        Mô tả: {doctor?.practisingCertificate}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>Chứng chỉ</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Chuyên khoa</TableCell>
                                    <TableCell align="left">Bằng chứng</TableCell>
                                    <TableCell align="left">Ngày cấp</TableCell>
                                    <TableCell align="left">Mô tả</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {doctor?.certificationDoctors?.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="left">
                                            {item.certification?.name}
                                        </TableCell>
                                        <TableCell align="left">{item.evidence}</TableCell>
                                        <TableCell align="left">
                                            {Moment(item.dateOfIssue).format("d MMM yy")}
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.certification?.description}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* {doctor?.majorDoctors?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="right">{item.evidence}</TableCell>
                                        <TableCell align="right">{item.dateOfIssue}</TableCell>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>Chuyên khoa</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Mã chuyên khoa</TableCell>
                                    <TableCell align="left">Tên chuyên khoa</TableCell>
                                    <TableCell align="left">Mô tả</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {doctor?.majorDoctors?.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="left">{item.majorId}</TableCell>
                                        <TableCell align="left">{item.major?.name}</TableCell>

                                        <TableCell align="left">
                                            {item.major?.description}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>Bệnh viện công tác</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Mã bệnh viện bệnh viện</TableCell>
                                    <TableCell align="left">Tên bệnh viện</TableCell>
                                    <TableCell align="left">Tình trạng làm việc</TableCell>
                                    <TableCell align="left">Mô tả</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {doctor?.hospitalDoctors?.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="left">{item.hospitalId}</TableCell>
                                        <TableCell align="left">{item.hospital?.name}</TableCell>
                                        <TableCell align="left">{item.isWorking}</TableCell>
                                        <TableCell align="left">
                                            {item.hospital?.description}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </form>
    );

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
                            {profile}
                        </Grid>
                        <Grid item lg={8} md={6} xs={12}>
                            {/* <AccountProfileDetails /> */}
                            <br />
                            {doctorProfile}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default DoctorDetails;
