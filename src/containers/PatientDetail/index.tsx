import React from "react";

import { Account } from "../AccountManagement/models/Account.model";
import { Patient } from "./models/Patient.model";

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
} from "@mui/material";
import { Box } from "@mui/system";

const account: Account = {
    id: 13,
    email: "taylor13@gmail.com",
    firstName: "Taylor",
    lastName: "Swift",
    streetAddress: "21 W.",
    locality: "46th St.",
    city: "New York",
    postalCode: "10001",
    phone: "0891213001",
    dob: "13/12/1989",
    isMale: false,
    active: true,
    registerTime: "01/10/2021",
    role: {
        id: 1,
        name: "patient",
    },
};

const patient: Patient = {
    backgroundDisease: "none",
    allergy: "none",
    bloodGroup: "O+",
    healthChecks: [
        { createdTime: "01/05/2021", doctorName: "Dr. Smith", status: "Đang đợi" },
        { createdTime: "01/04/2021", doctorName: "Dr. Smith", status: "Hủy" },
        { createdTime: "01/03/2021", doctorName: "Dr. Smith", status: "Kết thúc" },
        { createdTime: "01/02/2021", doctorName: "Dr. Smith", status: "Hủy" },
        { createdTime: "01/01/2021", doctorName: "Dr. Smith", status: "Kết thúc" },
    ],
};

const imgLink =
    "https://celebmafia.com/wp-content/uploads/2020/01/taylor-swift-variety-magazine-sundance-issue-2020-4.jpg";

const PatientDetail: React.FC = () => {
    const profile = (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Avatar
                        src={imgLink}
                        sx={{
                            height: 100,
                            width: 100,
                        }}
                    />
                    <Typography color="textPrimary" gutterBottom variant="h4">
                        {`${account.firstName} ${account.lastName}`}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                        {account.email}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                        {`Điện thoại: ${account.phone}`}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                        {`Mã bưu điện: ${account.postalCode}`}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                        {`${account.streetAddress} ${account.locality} ${account.city}`}
                    </Typography>
                    <Typography color="textSeconda" variant="caption">
                        {`Ngày đăng ký: ${account.registerTime}`}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button color="primary" fullWidth variant="text">
                    {account.active ? "Khóa tài khoản" : "Kích hoạt tài khoản"}
                </Button>
            </CardActions>
        </Card>
    );

    const healthInfo = (
        <Card>
            <CardHeader title="Thông tin về sức khỏe" />
            <Divider />
            <CardContent>
                <Grid container>
                    <Grid item lg={7}>
                        <Typography color="textSecondary" variant="body1">
                            {`Ngày sinh: ${account.dob}`}
                        </Typography>
                    </Grid>
                    <Grid item lg={5}>
                        <Typography color="textSecondary" variant="body1">
                            {`Nhóm máu: ${patient.bloodGroup}`}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography color="textSecondary" variant="body1">
                    {`Danh sách bệnh nền: ${patient.backgroundDisease}`}
                </Typography>
                <Typography color="textSecondary" variant="body1">
                    {`Tiền sử dị ứng: ${patient.allergy}`}
                </Typography>
            </CardContent>
        </Card>
    );

    const consultingHistory = (
        <Card>
            <CardHeader title="Lịch sử đăng ký tư vấn khám chữa bệnh" />
            <Divider />
            <CardContent>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    {patient.healthChecks?.map((item, index) => (
                        <Card variant="outlined" sx={{ m: 2 }} key={index}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {item.doctorName}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {item.createdTime}
                                </Typography>
                                <Typography variant="body2">{item.status}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Chi tiết</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                <Button size="small">Xem thêm</Button>
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
                    <Grid item lg={8} md={6} xs={12} spacing={3}>
                        <Grid>{healthInfo}</Grid>
                        <Grid sx={{ mt: 3 }}>{consultingHistory}</Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default PatientDetail;
