import { useState } from "react";

import { SymptomHealthChecks } from "../models/HealthCheckDetail.model";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

export interface ISymptomHealthChecks {
    symptomHealthChecks: SymptomHealthChecks[];
}

const SymptomHealthCheck: React.FC<ISymptomHealthChecks> = (props: ISymptomHealthChecks) => {
    const [expanded, setExpanded] = useState<string | false>("panel1");
    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <form autoComplete="off" noValidate>
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography>Thông tin triệu chứng</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Tên triệu chứng</TableCell>
                                    <TableCell align="left">Bằng chứng</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props?.symptomHealthChecks?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="left">{item?.symptom}</TableCell>
                                        <TableCell align="left">{item?.evidence}</TableCell>
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

export default SymptomHealthCheck;
