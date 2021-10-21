import * as React from "react";

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
import Typography from "@mui/material/Typography";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function createData(
    name: string,
    calories: string,
    image: string,
    fat: string,
    carbs: string,
    protein: string
) {
    return { name, calories, image, fat, carbs, protein };
}

const rows = [
    createData(
        "1",
        "Lưới tản nhiệt",
        "https://phutungoto168.net/wp-content/uploads/2019/03/Luoi-tan-nhiet-can-truoc-giua-xe-Volkswagen-new-beetle-cabriolet.jpg",
        "500.000",
        "Yamaha",
        "Nhật Bản"
    ),
    createData(
        "2",
        "Cần sang số",
        "https://salt.tikicdn.com/ts/product/8c/46/c6/b7045ab20c43b4d99163f2002335162b.jpg",
        "250.000",
        "Yamaha",
        "Nhật Bản"
    ),
    createData(
        "3",
        "Nắp ca-pô",
        "http://phutunggm.com/wp-content/uploads/2017/10/nap-ca-po-xe-spark-m-300.jpg",
        "150.000",
        "Yamaha",
        "Nhật Bản"
    ),
    createData(
        "4",
        "Gương chiếu hậu",
        "https://shop2banh.vn/images/2015/11/20151116_639f275c68f3b196da4e6948cdd14afe_1447664431.JPG",
        "100.000",
        "Yamaha",
        "Nhật Bản"
    ),
    createData(
        "5",
        "Tay ga",
        "https://hd1.hotdeal.vn/images/uploads/2016/Thang%207/19/277830/277830-tay-cam-xe-may-monster-body%20%283%29.jpg",
        "80.000",
        "Yamaha",
        "Nhật Bản"
    ),
    createData(
        "6",
        "Khóa yên",
        "https://cdn-images.kiotviet.vn/phutungdream/29f5962512454c5c9fc1e0608bbe6ad0.jpeg",
        "500.000",
        "Yamaha",
        "Nhật Bản"
    ),
    createData(
        "7",
        "Bàn đạp thắng sau",
        "https://cf.shopee.vn/file/943b8ae805e89f201f086662bce5de52",
        "600.000",
        "Yamaha",
        "Nhật Bản"
    ),
    createData(
        "8",
        "Cao su giảm chấn yên xe",
        "https://cf.shopee.vn/file/0012b7175f42cfa220cce0b97fae2ff9",
        "700.000",
        "Yamaha",
        "Nhật Bản"
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

const AccesssaryManagements: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Box>
                <Typography variant="h3">Phụ tùng cửa hàng Hàng Xanh</Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Xe máy" />
                        <Tab label="Ô tô" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">Tên</TableCell>
                                    <TableCell align="left">Hình ảnh</TableCell>
                                    <TableCell align="left">Giá tiền (VNĐ)</TableCell>
                                    <TableCell align="left">Nhà sản xuất</TableCell>
                                    <TableCell align="left">Xuất xứ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell align="left" width="200">
                                            {row.calories}
                                        </TableCell>
                                        <TableCell align="left" width="130">
                                            <img
                                                width="100%"
                                                height="100%"
                                                src={row.image}
                                                loading="lazy"
                                            />
                                        </TableCell>
                                        <TableCell align="left" width="100">
                                            {row.fat}
                                        </TableCell>
                                        <TableCell align="left" width="200">
                                            {row.carbs}
                                        </TableCell>
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
                                    <TableCell align="left">ID:</TableCell>
                                    <TableCell align="left">Tên</TableCell>
                                    <TableCell align="left">Giá tiền</TableCell>
                                    <TableCell align="left">Nhà sản xuất</TableCell>
                                    <TableCell align="left">Xuất xứ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell>{row.name}</TableCell>
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
        </React.Fragment>
    );
};
export default AccesssaryManagements;
