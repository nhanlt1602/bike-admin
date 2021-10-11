import { CardActions } from "@material-ui/core";

import { Prescriptions } from "../../models/HealthCheckDetail.model";

import { Button, Card, CardContent, CardHeader, Modal, Typography } from "@mui/material";

export interface IDrugDialog {
    open: boolean;
    handleClose: () => void;
    prescription: Prescriptions[];
}
const DrugDialog: React.FC<IDrugDialog> = (props: IDrugDialog) => {
    const { open, handleClose, prescription } = props;
    return (
        <Modal
            open={open}
            aria-labelledby="drug-list-dialog"
            aria-describedby="drug-list-description"
        >
            <Card
                sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    minWidth: 275,
                    mx: "auto",
                    p: 1,
                    m: 2,
                    borderRadius: 1,
                }}
            >
                <CardHeader title={<Typography variant="h6">Đơn thuốc</Typography>} />
                <CardContent></CardContent>
                <CardActions>
                    <Button variant="contained" onClick={() => handleClose()}>
                        Thoát
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    );
};

export default DrugDialog;
