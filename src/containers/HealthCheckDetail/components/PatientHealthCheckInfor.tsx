import { useState } from "react";

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from "@mui/material";

export interface IPatientHealthInfo {
    allery?: string;
    backgroundDisease?: string;
}

const PatientHealthInfomation: React.FC<IPatientHealthInfo> = (props: IPatientHealthInfo) => {
    const [expanded, setExpanded] = useState<string | false>("alleryPanel");

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <form autoComplete="off" noValidate>
            {/* Allery Expand */}
            <Accordion expanded={expanded === "alleryPanel"} onChange={handleChange("alleryPanel")}>
                <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="allery-panel-content"
                    id="allery-panel-header"
                >
                    <Typography sx={{ width: "1/3", flexShrink: 0, fontWeight: "bold" }}>
                        Bệnh nhân
                    </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <Typography>Tiền sử dị ứng: {props.allery}</Typography>
                    <Typography>Danh sách bệnh nền:{props.backgroundDisease}</Typography>
                </AccordionDetails>
            </Accordion>
            {/* Background Disease Expand */}
            {/* <Accordion
                expanded={expanded === "bkgDiseasePanel"}
                onChange={handleChange("bkgDiseasePanel")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="bkg-disease-panel-content"
                    id="bkg-disease-panel-header"
                >
                    <Typography sx={{ width: "1/3", flexShrink: 0 }}></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ color: "text.secondary" }}>
                        Danh sách bệnh nền:{props.backgroundDisease}
                    </Typography>
                </AccordionDetails>
            </Accordion> */}
        </form>
    );
};

export default PatientHealthInfomation;
