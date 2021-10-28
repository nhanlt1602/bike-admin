import * as React from "react";

import BarChart from "./component/BarChart";
import LineChart from "./component/LineChart";
import Order from "./component/order";
import OrderFail from "./component/orderFail";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
    BoxProps,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Icon,
    IconButton,
    Stack,
    TextField,
} from "@mui/material";
import { Card, Container, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function ItemTextField(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                color: "white",
                p: 0.5,
                m: 0.5,
                borderRadius: 1,
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: "700",
                ...sx,
            }}
            {...other}
        />
    );
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
                borderRadius: 1,
                textAlign: "left",
                fontSize: 19,
                fontWeight: "700",
                boxShadow: 2,
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
    const [open, setOpen] = React.useState(false);
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
    const [open, setOpen] = React.useState(false);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
                <DialogContent>
                    <Box sx={{}}>
                        <Box sx={{ display: "flex" }}>
                            <ItemTextField>
                                <TextField
                                    label="Tên cửa hàng"
                                    variant="outlined"
                                    value="Hàng Xanh"
                                />
                            </ItemTextField>
                            <ItemTextField>
                                <TextField
                                    label="Chủ cửa hàng"
                                    variant="outlined"
                                    value="Lê Trọng Nhân"
                                />
                            </ItemTextField>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <ItemTextField>
                                <TextField
                                    label="Số điện thoại"
                                    variant="outlined"
                                    value="0889386214"
                                />
                            </ItemTextField>
                            <ItemTextField>
                                <TextField
                                    label="Mã số thuế"
                                    variant="outlined"
                                    value="5362536325"
                                />
                            </ItemTextField>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <ItemTextField>
                                <TextField
                                    label="Mã cửa hàng"
                                    variant="outlined"
                                    value="Sửa xe, bảo trì và cung cấp phụ tùng"
                                />
                            </ItemTextField>
                            <ItemTextField>
                                <TextField label="Loại" variant="outlined" value="Ô tô, xe máy" />
                            </ItemTextField>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <ItemTextField>
                                <TextField
                                    label="Chuyên"
                                    variant="outlined"
                                    value="Sửa xe, bảo trì và cung cấp phụ tùng"
                                />
                            </ItemTextField>
                            <ItemTextField>
                                <TextField
                                    label="Địa chỉ"
                                    variant="outlined"
                                    value="45 Bưng Ông Thoàn, Phượng Hiệp Phú, Quận 9"
                                />
                            </ItemTextField>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: "flex" }}>
                    <Button onClick={() => setOpen(false)}>Hủy</Button>
                    <Button onClick={() => setOpen(false)}>Lưu</Button>
                </DialogActions>
            </Dialog>
            <Box
                sx={{
                    mx: "auto",
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                    textAlign: "center",
                }}
            >
                <Typography variant="h3">Hàng xanh Yamaha</Typography>
            </Box>

            <Box sx={{ mt: 2 }} />
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={12} md={10} lg={12}>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="h6" component="div">
                                Thông tin cửa hàng
                                <IconButton onClick={() => setOpen(true)}>
                                    <Icon>edit</Icon>
                                </IconButton>
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gridTemplateColumns: "repeat(3, 1fr)" }}>
                            <Item>
                                <Box
                                    sx={{ display: "inline-flex", justifyContent: "space-between" }}
                                >
                                    <Box sx={{ justifyContent: "space-between" }}>
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
                                                Loại:
                                            </Typography>
                                            <Typography variant="body2" component="h5">
                                                Ô tô, xe máy
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Box sx={{ display: "flex" }}>
                                                <Box sx={{ mt: 1 }}>
                                                    <Button>
                                                        {/* <Typography variant="body2" component="h5"> */}
                                                        <Chip
                                                            label="Đang hoạt động"
                                                            color="success"
                                                        />
                                                        {/* </Typography> */}
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Stack>
                                    </Box>
                                    <Box sx={{ justifyContent: "space-between", ml: "5rem" }}>
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
                                    </Box>
                                </Box>
                            </Item>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="lg">
                <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" component="div">
                        Thông tin kế toán
                    </Typography>
                </Box>
                <Box sx={{ mt: 1 }} />
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3} lg={3}>
                        <Card sx={{ width: "100%" }}>
                            <Box
                                sx={{
                                    bgcolor: "background.paper",
                                    boxShadow: 1,
                                    borderRadius: 1,
                                    p: 2,
                                }}
                            >
                                <Box sx={{ color: "text.secondary" }}>Tổng thu</Box>
                                <Box
                                    sx={{
                                        color: "text.primary",
                                        fontSize: 28,
                                        fontWeight: "medium",
                                    }}
                                >
                                    231.453.000 VNĐ
                                </Box>
                                <Divider />
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
                    <Grid item xs={12} md={3} lg={3}>
                        <Card sx={{ width: "100%" }}>
                            <Box
                                sx={{
                                    bgcolor: "background.paper",
                                    boxShadow: 1,
                                    borderRadius: 1,
                                    p: 2,
                                }}
                            >
                                <Box sx={{ color: "text.secondary" }}>Tổng chi</Box>
                                <Box
                                    sx={{
                                        color: "text.primary",
                                        fontSize: 28,
                                        fontWeight: "medium",
                                    }}
                                >
                                    70.000.000 VNĐ
                                </Box>
                                <Divider />
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
                    <Grid item xs={12} md={3} lg={3}>
                        <Card sx={{}}>
                            <Box
                                sx={{
                                    bgcolor: "background.paper",
                                    boxShadow: 1,
                                    borderRadius: 1,
                                    p: 2,
                                }}
                            >
                                <Box sx={{ color: "text.secondary" }}>Đơn đã hoàn thành</Box>
                                <Box
                                    sx={{
                                        color: "text.primary",
                                        fontSize: 28,
                                        fontWeight: "medium",
                                    }}
                                >
                                    12.3 K
                                </Box>
                                <Divider />
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
                    {/* </Grid>

                        <Grid container spacing={2}> */}

                    <Grid item xs={12} md={3} lg={3}>
                        <Card sx={{}}>
                            <Box
                                sx={{
                                    bgcolor: "background.paper",
                                    boxShadow: 1,
                                    borderRadius: 1,
                                    p: 2,
                                }}
                            >
                                <Box sx={{ color: "text.secondary" }}>Đơn bị hủy</Box>
                                <Box
                                    sx={{
                                        color: "text.primary",
                                        fontSize: 28,
                                        fontWeight: "medium",
                                    }}
                                >
                                    0.3 K
                                </Box>
                                <Divider />
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
            </Container>

            <Box sx={{ mt: 8 }} />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <LineChart />
                </Grid>
                <Grid item xs={6}>
                    <BarChart />
                </Grid>
            </Grid>
            <Box sx={{ mt: 8 }} />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Order />
                </Grid>
                <Grid item xs={6}>
                    <OrderFail />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
export default OrderManagement;
