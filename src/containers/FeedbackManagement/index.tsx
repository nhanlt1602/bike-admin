import * as React from "react";

import BlockIcon from "@mui/icons-material/Block";
import { Chip, IconButton, Rating, Tooltip, Typography } from "@mui/material";
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
    carbs: number,
    protein: string,
    status: boolean
) {
    return { name, calories, fat, carbs, protein, status };
}

const rows = [
    createData("1", "Lê Trọng Nhân", "Nhiệt tình, thân thiệt", 4, "01-10-2021", true),
    createData("2", "Phạm Văn Danh", "Nhiệt tình, thân thiệt", 5, "01-10-2021", false),
    createData("3", "Trương Thanh Bình", "Nhiệt tình, thân thiệt", 4, "01-10-2021", true),
    createData("4", "Nguyễn Văn Tâm", "Nhiệt tình, thân thiệt", 4, "01-10-2021", true),
    createData("5", "Nguyễn Đình Hào", "Nhiệt tình, thân thiệt", 4, "01-10-2021", true),
];

const FeedbackManagement: React.FC = () => {
    return (
        <React.Fragment>
            <Box>
                <Typography variant="h4">Quản lý feedback</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="left">Tên thợ</TableCell>
                            <TableCell align="left">Nội dung Feedback</TableCell>
                            <TableCell align="center">Đánh giá</TableCell>
                            <TableCell align="left">Ngày</TableCell>
                            <TableCell align="left">Trạng thái</TableCell>
                            <TableCell align="left">Action</TableCell>
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
                                <TableCell align="center">
                                    <Rating name="read-only" value={row.carbs} readOnly />
                                </TableCell>
                                <TableCell align="left">{row.protein}</TableCell>
                                <TableCell align="left">
                                    <Chip
                                        label={row.status === true ? "Hợp lệ" : "Không hợp lệ"}
                                        color={row.status === true ? "success" : "warning"}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Tooltip title="Block">
                                        <IconButton>
                                            <BlockIcon color="error" />
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

export default FeedbackManagement;
