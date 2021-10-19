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

function createData(name: string, calories: string, fat: string, carbs: string, protein: string) {
    return { name, calories, fat, carbs, protein };
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
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Thành công" />
                    <Tab label="Hủy" />
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
    );
};
export default OrderManagement;
