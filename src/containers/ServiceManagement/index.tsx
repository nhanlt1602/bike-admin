import * as React from "react";

import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";

function createData(name: string, calories: string, fat: string, carbs: string, protein: string) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("1", "Cứu hộ xe máy", "Trương Thành Nam", "300.000", "01/10/2021"),
    createData("2", "Cứu hộ ô tô", "Trương Thành Nam", "1.000.000", "01/10/2021"),
    createData("3", "Thay vỏ", "Trương Thành Nam", "300.000", "01/10/2021"),
    createData("4", "Bảo trì", "Tô Bá Sơn", "700.000", "01/10/2021"),
    createData("5", "Lấy số khung xe may", "Nguyễn Việt Hồng", "100.000", "01/10/2021"),
];

export default function ServiceManagement() {
    return (
        <React.Fragment>
            <Box>
                <Typography variant="h3">Dịch vụ cửa hàng Hàng Xanh</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="left">Tên dịch vụ</TableCell>
                            <TableCell align="left">Tên nhân viên</TableCell>
                            <TableCell align="left">Giá tiền (VNĐ)</TableCell>
                            <TableCell align="left">Ngày</TableCell>
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
        </React.Fragment>
    );
}
