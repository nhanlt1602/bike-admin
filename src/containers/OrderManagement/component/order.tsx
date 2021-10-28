import * as React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#E46B10",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

// function createData(name: string, calories: string, fat: string, carbs: string, protein: string) {
//     return { name, calories, fat, carbs, protein };
// }
function createData(
    customer: string,
    repair: string,
    accessary: string,
    price: string,
    address: string
) {
    return { customer, repair, accessary, price, address };
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

const Order: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Box sx={{ width: "100%" }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 600 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center" colSpan={5}>
                                    Đơn hàng thành công
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>Khách hàng</StyledTableCell>
                                <StyledTableCell align="left">Thợ sửa</StyledTableCell>
                                <StyledTableCell align="left">Phụ tùng</StyledTableCell>
                                <StyledTableCell align="left">Tổng tiền (VNĐ)</StyledTableCell>
                                <StyledTableCell align="left">Địa điểm</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.customer}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row.customer}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.repair}</StyledTableCell>
                                    <StyledTableCell align="left">{row.accessary}</StyledTableCell>
                                    <StyledTableCell align="left">{row.price}</StyledTableCell>
                                    <StyledTableCell align="left">{row.address}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </React.Fragment>
    );
};
export default Order;
