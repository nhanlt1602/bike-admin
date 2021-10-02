import React from "react";

import { API_ROOT_URL } from "src/configurations";

import CRUDTable, { IColumn } from "../CRUDTable";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, Chip, Divider } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

const Certificate = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const columnCetificate: IColumn[] = [
        {
            field: "id",
            align: "left",
            title: "ID",
            type: "index",
            disableFilter: true,
            editable: "never",
            index: 1,
        },
        {
            field: "certificationId",
            align: "left",
            title: "Mã chứng chỉ",
            index: 2,
        },
        {
            field: "evidence",
            align: "left",
            title: "Hình ảnh",
            index: 3,
        },
        {
            field: "dateOfIssue",
            align: "left",
            title: "Ngày cấp chứng chỉ",
            index: 4,
        },
        {
            field: "certification",
            align: "left",
            title: "Chứng chỉ",
            index: 5,
        },
    ];

    const columnMajor: IColumn[] = [
        {
            field: "id",
            align: "left",
            title: "ID",
            type: "index",
            disableFilter: true,
            editable: "never",
            index: 1,
        },
        {
            field: "majorId",
            align: "left",
            title: "Mã chuyên khoa",
            index: 2,
        },
        {
            field: "major",
            align: "left",
            title: "Tên chuyên khoa",
            index: 3,
        },
    ];

    const columnHospital: IColumn[] = [
        {
            field: "id",
            align: "left",
            title: "ID",
            type: "index",
            disableFilter: true,
            editable: "never",
            index: 1,
        },
        {
            field: "hospitalId",
            align: "left",
            title: "Mã bệnh viện",
            index: 2,
        },
        {
            field: "hospital",
            align: "left",
            title: "Tên bệnh viện",
            index: 3,
        },
        {
            field: "isWorking",
            align: "left",
            title: "Tình trạng",
            index: 4,
        },
    ];

    return (
        <form autoComplete="off" noValidate>
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography>Thông tin hành nghề</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography color="textPrimary" gutterBottom>
                        Chứng chỉ hành nghề:
                    </Typography>
                    <Typography color="textPrimary" gutterBottom>
                        Mã chứng chỉ
                    </Typography>
                    <Typography color="textPrimary" gutterBottom>
                        Nơi cấp chứng chỉ
                    </Typography>
                    <Typography color="textPrimary" gutterBottom>
                        Phạm vi thực hành
                    </Typography>
                    <Typography color="textPrimary" gutterBottom>
                        Mô tả
                    </Typography>
                    <Typography color="textPrimary" gutterBottom>
                        Số lượng người tư vấn
                    </Typography>
                    <Typography color="textPrimary" gutterBottom>
                        Xác nhận <Chip label="success" color="success" />
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>Chứng chỉ</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <CRUDTable
                        title="Chứng chỉ"
                        enableFilter
                        columns={columnCetificate}
                        query={`${API_ROOT_URL}/hospitals`}
                        action={{
                            onDelete: true,
                        }}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>Chuyên khoa</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <CRUDTable
                        title="Chứng chỉ"
                        enableFilter
                        columns={columnMajor}
                        query={`${API_ROOT_URL}/hospitals`}
                        action={{
                            onDelete: true,
                        }}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>Bệnh viện công tác</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <CRUDTable
                        title="Chứng chỉ"
                        enableFilter
                        columns={columnHospital}
                        query={`${API_ROOT_URL}/hospitals`}
                        action={{
                            onDelete: true,
                        }}
                    />
                </AccordionDetails>
            </Accordion>
        </form>
    );
};

export default Certificate;
