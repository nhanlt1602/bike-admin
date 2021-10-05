import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from "@mui/material";

export interface IPatientHealthInfo {
    allery?: string;
    backgroundDisease?: string;
}

const PatientHealthInfo: React.FC<IPatientHealthInfo> = (props: IPatientHealthInfo) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Card>
            <CardHeader title="Thông tin về sức khỏe" />
            <Divider />
            <CardContent>
                {/* Allery Expand */}
                <Accordion
                    expanded={expanded === "alleryPanel"}
                    onChange={handleChange("alleryPanel")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="allery-panel-content"
                        id="allery-panel-header"
                    >
                        <Typography sx={{ width: "1/3", flexShrink: 0 }}>Tiền sử dị ứng</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ color: "text.secondary" }}>{props.allery}</Typography>
                    </AccordionDetails>
                </Accordion>
                {/* Background Disease Expand */}
                <Accordion
                    expanded={expanded === "bkgDiseasePanel"}
                    onChange={handleChange("bkgDiseasePanel")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="bkg-disease-panel-content"
                        id="bkg-disease-panel-header"
                    >
                        <Typography sx={{ width: "1/3", flexShrink: 0 }}>
                            Danh sách bệnh nền
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ color: "text.secondary" }}>
                            {props.backgroundDisease}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    );
};

export default PatientHealthInfo;
