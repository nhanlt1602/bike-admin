import { useState } from "react";

import moment from "moment";

import { Slots } from "../models/HealthCheckDetail.model";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";

export interface ISlots {
    slots: Slots[];
}

const Slot: React.FC<ISlots> = (props: ISlots) => {
    const [expanded, setExpanded] = useState<string | false>("panel1");
    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <form autoComplete="off" noValidate>
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography fontWeight="bold">Thông tin khung giờ tư vấn</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" width="80px">
                                        Ngày chỉ định
                                    </TableCell>
                                    <TableCell align="left" width="80px">
                                        Thời gian bắt đầu
                                    </TableCell>
                                    <TableCell align="left" width="80px">
                                        Thời gian kết thúc
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props?.slots?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="left" width="80px">
                                            {moment(item?.assignedDate).format(`DD/MM/YYYY`)}
                                        </TableCell>
                                        <TableCell align="left" width="80px">
                                            {item?.startTime}
                                        </TableCell>
                                        <TableCell align="left" width="80px">
                                            {item?.endTime}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </form>
    );
};

export default Slot;
