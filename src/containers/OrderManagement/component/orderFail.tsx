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
        backgroundColor: "#4db6ac",
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
function createData(customer: string, repair: string, accessary: string, address: string) {
    return { customer, repair, accessary, address };
}

const rows = [
    createData(
        "Hồ Lê Quỳnh Như",
        "Nguyễn Duy Mạnh",
        "Cửa hàng không đủ thiết bị",
        "39, Võ Văn Ngân, Thủ Đức"
    ),
    createData(
        "Trương Thanh Bình",
        "Lương Thanh Hà",
        "Dòng xe này quá cũ không thể sửa",
        "112, Kha Vạn Cân, Thủ Đức"
    ),
    createData(
        "Đoàn Kim Thanh",
        "Phạm Văn Danh",
        "Người hư xe không đồng ý sửa xe",
        "12, Phạm Văn Đồng, Thủ Đức"
    ),
    createData(
        "Nguyễn Văn Tâm",
        "Trần Thị Khánh Vy",
        "Cửa hàng không đủ thiết bị",
        "D2, Hiệp Phú, Quận 9"
    ),
    createData(
        "Nguyễn Đình Hào",
        "Phạm Văn Danh",
        "Không tìm thấy người đặt hẹn",
        "12, Võ Văn Tăng, Quận 9"
    ),
];

const OrderFail: React.FC = () => {
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
                                    Đơn hàng đã hủy
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>Người bị hư xe</StyledTableCell>
                                <StyledTableCell align="left">Nhân viên cửa hàng</StyledTableCell>
                                <StyledTableCell align="left">Lí do hủy đơn</StyledTableCell>
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
export default OrderFail;
