import { useState } from "react";

import moment from "moment";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Grid,
    Typography,
} from "@mui/material";

export interface IPatientInfo {
    height?: number;
    weight?: number;
    reasonCancel?: string;
    rating?: number;
    comment?: string;
    advice?: string;
    createTime?: string;
    canceledTime?: string;
}

const PatientInformation: React.FC<IPatientInfo> = (props: IPatientInfo) => {
    const [expanded, setExpanded] = useState<string | false>("panel1");
    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
            <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography fontWeight="bold">Thông tin khác</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <Typography color="textPrimary" gutterBottom>
                            Chiều cao: {props?.height}
                        </Typography>
                        <Typography color="textPrimary" gutterBottom>
                            Cân nặng: {props?.weight}
                        </Typography>
                        <Typography color="textPrimary" gutterBottom>
                            Lời khuyên: {props?.advice}
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Typography color="textPrimary" gutterBottom>
                            Đánh giá: {props?.rating}
                        </Typography>
                        <Typography color="textPrimary" gutterBottom>
                            Bình luận: {props?.comment}
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Typography color="textPrimary" gutterBottom>
                            Ngày bắt đầu: {moment(props?.createTime).format(`DD/MM/YYYY`)}
                        </Typography>
                        <Typography color="textPrimary" gutterBottom>
                            Lý do hủy: {props?.reasonCancel}
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Typography color="textPrimary" gutterBottom>
                            Ngày kết thúc: {props?.canceledTime}
                        </Typography>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default PatientInformation;
