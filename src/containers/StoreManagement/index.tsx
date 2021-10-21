import * as React from "react";

import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, IconButton, Link, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";

function createData(
    name: string,
    calories: string,
    fat: string,
    carbs: string,
    status: boolean,
    protein: string
) {
    return { name, calories, fat, carbs, status, protein };
}

const rows = [
    createData(
        "1",
        "Hàng Xanh",
        "Lê Trọng Nhân",
        "088923124",
        true,
        "43 Hàng Xanh, Quận Bình Thạch, Tp. Hồ Chí Minh"
    ),
    createData(
        "2",
        "Tân Kỳ",
        "Phạm Văn Danh",
        "037289289",
        true,
        "56 Mai Phú Thọ, Quận 2, Tp. Hồ Chí Minh"
    ),
    createData("3", "Tân Quý", "Nguyên Văn Tâm", "037456456", true, "41, Quận 4, Tp. Hồ Chí Minh"),
    createData(
        "4",
        "Đại Lộc",
        "Trương Thanh Bình",
        "0881188922",
        false,
        "56 Võ Văn Kiệt, Quận 7, Tp. Hồ Chí Minh"
    ),
    createData(
        "5",
        "Lê Văn Việt",
        "Nguyễn Đình Hào",
        "088955255",
        true,
        "12 Lê Văn Việt, Quận 9, Tp. Hồ Chí Minh"
    ),
    createData(
        "6",
        "Tấn Phát",
        "Nguyễn Hoàng Long",
        "0235415555",
        true,
        "53 Tấn Phát, Quận 9, Tp. Hồ Chí Minh"
    ),
    createData(
        "7",
        "Lê Lợi",
        "Lê Trọng Nhân",
        "088923124",
        true,
        "256 Lê Lợi, Quận 9, Tp. Hồ Chí Minh"
    ),
];

const StoreManagement: React.FC = () => {
    return (
        <React.Fragment>
            <Box>
                <Typography variant="h3">Quản lý cửa hàng</Typography>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID: </TableCell>
                            <TableCell align="left">Tên cửa hàng</TableCell>
                            <TableCell align="left">Chủ cửa hàng</TableCell>
                            <TableCell align="left">Số điện thoại</TableCell>
                            <TableCell align="left">Trạng thái</TableCell>
                            <TableCell align="left">Địa chỉ</TableCell>
                            <TableCell align="center">Action</TableCell>
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
                                <TableCell align="left">
                                    <Link href="/order">{row.calories}</Link>
                                </TableCell>
                                <TableCell align="left">{row.fat}</TableCell>
                                <TableCell align="left">{row.carbs}</TableCell>
                                <TableCell align="left">
                                    <Chip
                                        label={row.status === true ? "Active" : "Inactive"}
                                        color={row.status === true ? "success" : "warning"}
                                    />
                                </TableCell>
                                <TableCell align="left">{row.protein}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Block store ">
                                        <IconButton>
                                            <BlockIcon color="error" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Update infomation">
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
};

export default StoreManagement;
