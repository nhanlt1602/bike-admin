import * as React from "react";

import FeedbackManagement from "../FeedbackManagement";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { BoxProps, Button, Chip, Link, Stack } from "@mui/material";
import { Card, Container, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function createData(name: string, calories: string, fat: string, carbs: string, protein: string) {
    return { name, calories, fat, carbs, protein };
}
function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                bgcolor: "#fafafa",
                color: "black",
                p: 1,
                m: 1,
                borderRadius: 5,
                textAlign: "left",
                fontSize: 19,
                fontWeight: "700",
                boxShadow: 5,
                ...sx,
            }}
            {...other}
        />
    );
}
const rows = [
    createData("Lê Trọng Nhân", "Phan thi Tra My", "Lốp xe", "125.00", "D2, Hiệp Phú, Quận 9"),
    createData("Trương Thanh Bình", "Lương Thanh Hà", "Yên xe", "300.00", "D2, Hiệp Phú, Quận 9"),
    createData("Lý Gia Hân", "Phạm Văn Danh", "Kính xe", "125.00", "D2, Hiệp Phú, Quận 9"),
    createData("Nguyễn Văn Tâm", "Trần Thị Khánh Vy", "Lốp xe", "200.00", "D2, Hiệp Phú, Quận 9"),
    createData(
        "Nguyễn Đình Hào",
        "Phạm Văn Danh",
        "Nhông sên dĩa",
        "135.00",
        "D2, Hiệp Phú, Quận 9"
    ),
];

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const OrderManagement: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    mx: "auto",
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                    textAlign: "center",
                }}
            >
                <Typography variant="h3">Cửa hàng Hàng Xanh</Typography>
                <Link href="/accessary" underline="none">
                    <Button>Quản lý phụ tùng</Button>
                </Link>
                <Link href="/service" underline="none">
                    <Button>Quản lý dịch vụ</Button>
                </Link>
            </Box>

            <Box sx={{ mt: 2 }} />
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="h6" component="div">
                                Thông tin cửa hàng
                            </Typography>
                        </Box>
                        <Box sx={{ display: "block", gridTemplateColumns: "repeat(3, 1fr)" }}>
                            <Item>
                                <Box sx={{ display: "block" }}>
                                    <Box sx={{ display: "flex" }}>
                                        <Stack direction="row" spacing={1}>
                                            <Typography
                                                variant="body2"
                                                component="div"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                Tên cửa hàng:
                                            </Typography>

                                            <Typography variant="body2" component="h5">
                                                Hàng xanh
                                            </Typography>
                                        </Stack>
                                    </Box>
                                    <Stack direction="row" spacing={1}>
                                        <Typography
                                            variant="body2"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Chủ cửa hàng:
                                        </Typography>

                                        <Typography variant="body2" component="h5">
                                            Lê Trọng Nhân
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <Typography
                                            variant="body2"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Số điện thoại:
                                        </Typography>

                                        <Typography variant="body2" component="h5">
                                            0889567567 - 088936936
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <Typography
                                            variant="body2"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Mã số thuế:
                                        </Typography>
                                        <Typography variant="body2" component="h5">
                                            5362536325
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <Typography
                                            variant="body2"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Chuyên:
                                        </Typography>
                                        <Typography variant="body2" component="h5">
                                            Sửa xe, bảo trì và cung cấp phụ tùng
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <Typography
                                            variant="body2"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Loại:
                                        </Typography>
                                        <Typography variant="body2" component="h5">
                                            Ô tô, xe máy
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <Typography
                                            variant="body2"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Mã cửa hàng:
                                        </Typography>
                                        <Typography variant="body2" component="h5">
                                            251251#f3f
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <Typography
                                            variant="body2"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Địa chỉ:
                                        </Typography>

                                        <Typography variant="body2" component="h5">
                                            45 Bưng Ông Thoàn, Phượng Hiệp Phú, Quận 9
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <Typography
                                            variant="body2"
                                            component="div"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Ngày đăng ký:
                                        </Typography>

                                        <Typography variant="body2" component="h5">
                                            15-05-2021
                                        </Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={1}>
                                        <Box sx={{ display: "flex" }}>
                                            <Box sx={{ mt: 1 }}>
                                                <Button>
                                                    {/* <Typography variant="body2" component="h5"> */}
                                                    <Chip label="Đang hoạt động" color="success" />
                                                    {/* </Typography> */}
                                                </Button>
                                            </Box>
                                            <Box sx={{ mt: 1, ml: 2 }}>
                                                <Button>
                                                    {/* <Typography variant="body2" component="h5"> */}
                                                    <Chip label="Cảnh cáo" />
                                                    {/* </Typography> */}
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Stack>

                                    <Box sx={{ mt: 1 }} />
                                </Box>
                            </Item>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="h6" component="div">
                                Thông tin kế toán
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 1 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Card sx={{ maxWidth: 600 }}>
                                    <Box
                                        sx={{
                                            bgcolor: "background.paper",
                                            boxShadow: 1,
                                            borderRadius: 1,
                                            p: 2,
                                            minWidth: 600,
                                        }}
                                    >
                                        <Box sx={{ color: "text.secondary" }}>Tổng thu</Box>
                                        <Box
                                            sx={{
                                                color: "text.primary",
                                                fontSize: 34,
                                                fontWeight: "medium",
                                            }}
                                        >
                                            231.453.000 VNĐ
                                        </Box>
                                        <TrendingUpIcon
                                            sx={{
                                                color: "success.dark",
                                                fontSize: 16,
                                                verticalAlign: "sub",
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                color: "success.dark",
                                                display: "inline",
                                                fontWeight: "medium",
                                                mx: 0.5,
                                            }}
                                        >
                                            9.2%
                                        </Box>
                                        <Box
                                            sx={{
                                                color: "text.secondary",
                                                display: "inline",
                                                fontSize: 12,
                                            }}
                                        >
                                            so với tuần trước
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card sx={{ maxWidth: 200 }}>
                                    <Box
                                        sx={{
                                            bgcolor: "background.paper",
                                            boxShadow: 1,
                                            borderRadius: 1,
                                            p: 2,
                                            minWidth: 300,
                                        }}
                                    >
                                        <Box sx={{ color: "text.secondary" }}>
                                            Đơn đã hoàn thành
                                        </Box>
                                        <Box
                                            sx={{
                                                color: "text.primary",
                                                fontSize: 34,
                                                fontWeight: "medium",
                                            }}
                                        >
                                            12.3 K
                                        </Box>
                                        <TrendingUpIcon
                                            sx={{
                                                color: "success.dark",
                                                fontSize: 16,
                                                verticalAlign: "sub",
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                color: "success.dark",
                                                display: "inline",
                                                fontWeight: "medium",
                                                mx: 0.5,
                                            }}
                                        >
                                            18.77%
                                        </Box>
                                        <Box
                                            sx={{
                                                color: "text.secondary",
                                                display: "inline",
                                                fontSize: 12,
                                            }}
                                        >
                                            so với tuần trước
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Card sx={{ maxWidth: 400 }}>
                                    <Box
                                        sx={{
                                            bgcolor: "background.paper",
                                            boxShadow: 1,
                                            borderRadius: 1,
                                            p: 2,
                                            minWidth: 400,
                                        }}
                                    >
                                        <Box sx={{ color: "text.secondary" }}>Tổng chi</Box>
                                        <Box
                                            sx={{
                                                color: "text.primary",
                                                fontSize: 34,
                                                fontWeight: "medium",
                                            }}
                                        >
                                            70.000.000 VNĐ
                                        </Box>
                                        <TrendingUpIcon
                                            sx={{
                                                color: "success.dark",
                                                fontSize: 16,
                                                verticalAlign: "sub",
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                color: "success.dark",
                                                display: "inline",
                                                fontWeight: "medium",
                                                mx: 0.5,
                                            }}
                                        >
                                            2.5%
                                        </Box>
                                        <Box
                                            sx={{
                                                color: "text.secondary",
                                                display: "inline",
                                                fontSize: 12,
                                            }}
                                        >
                                            so với tuần trước
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card sx={{ maxWidth: 200 }}>
                                    <Box
                                        sx={{
                                            bgcolor: "background.paper",
                                            boxShadow: 1,
                                            borderRadius: 1,
                                            p: 2,
                                            minWidth: 300,
                                        }}
                                    >
                                        <Box sx={{ color: "text.secondary" }}>Đơn bị hủy</Box>
                                        <Box
                                            sx={{
                                                color: "text.primary",
                                                fontSize: 34,
                                                fontWeight: "medium",
                                            }}
                                        >
                                            0.3 K
                                        </Box>
                                        <TrendingUpIcon
                                            sx={{
                                                color: "red",
                                                fontSize: 16,
                                                verticalAlign: "sub",
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                color: "success.dark",
                                                display: "inline",
                                                fontWeight: "medium",
                                                mx: 0.5,
                                            }}
                                        >
                                            2.1 k
                                        </Box>
                                        <Box
                                            sx={{
                                                color: "text.secondary",
                                                display: "inline",
                                                fontSize: 12,
                                            }}
                                        >
                                            so với tuần trước
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ mt: 2 }} />
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Đơn hàng thành công" />
                        <Tab label="Đơn hàng đã hủy" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Khách hàng</TableCell>
                                    <TableCell align="left">Thợ sửa</TableCell>
                                    <TableCell align="left">Phụ tùng</TableCell>
                                    <TableCell align="left">Tổng tiền (VNĐ)</TableCell>
                                    <TableCell align="left">Địa điểm</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.calories}</TableCell>
                                        <TableCell align="left">{row.fat}</TableCell>
                                        <TableCell align="left">{row.carbs}</TableCell>
                                        <TableCell align="left">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Khách hàng</TableCell>
                                    <TableCell align="left">Thợ sửa</TableCell>
                                    <TableCell align="left">Phụ tùng</TableCell>
                                    <TableCell align="left">Tổng tiền</TableCell>
                                    <TableCell align="left">Địa điểm</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.calories}</TableCell>
                                        <TableCell align="left">{row.fat}</TableCell>
                                        <TableCell align="left">{row.carbs}</TableCell>
                                        <TableCell align="left">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </Box>
            <Box sx={{ mt: 8 }} />
            <FeedbackManagement />
        </React.Fragment>
    );
};
export default OrderManagement;
