import { useState } from "react";

import { Prescriptions } from "../models/HealthCheckDetail.model";

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

export interface IPrescriptions {
    prescriptions: Prescriptions[];
}

const Prescription: React.FC<IPrescriptions> = (props: IPrescriptions) => {
    const [expanded, setExpanded] = useState<string | false>("panel1");
    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <form autoComplete="off" noValidate>
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography fontWeight="bold">Thông tin thuốc</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Tên thuốc</TableCell>
                                    <TableCell align="left">Nhóm thuốc</TableCell>
                                    <TableCell align="left">Mô tả nhóm thuốc</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props?.prescriptions?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="left">{item.drugType?.name}</TableCell>
                                        <TableCell align="left">{item.drugOrigin}</TableCell>
                                        <TableCell align="left">{item.drugType?.name}</TableCell>
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

export default Prescription;
