import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { DiseaseGroup } from "../models/DiseaseGroup.model";

import { Button, Card, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IDiseaseGroupForm {
    open: boolean;
    data: DiseaseGroup;
    handleClose: (type: "SAVE" | "CANCEL", data?: DiseaseGroup, callback?: Function) => void;
}

const DiseaseGroupForm: React.FC<IDiseaseGroupForm> = (props: IDiseaseGroupForm) => {
    const { data } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<DiseaseGroup>({});

    React.useEffect(() => {
        setValue("id", data.id);
        setValue("groupName", data.groupName);
    }, [data, setValue]);

    const submitHandler: SubmitHandler<DiseaseGroup> = (data: DiseaseGroup) => {
        // eslint-disable-next-line no-console
        console.log(data);
        if (data) {
            props.handleClose("SAVE", data, clearErrors);
        }
    };

    return (
        <Modal
            open={props.open}
            aria-labelledby="drugtype-dialog"
            aria-describedby="alert-drugtype-description"
        >
            <form onSubmit={handleSubmit(submitHandler)}>
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
                    <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
                        <Typography variant="h6" component="h2">
                            Thông tin dịch bệnh
                        </Typography>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 2, display: "flex", justifyContent: "center" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic"
                            label="Tên loại thuốc"
                            variant="outlined"
                            {...register("groupName", { required: true })}
                        />
                        {errors.groupName && <p>Name is required.</p>}
                    </Box>
                    <Box
                        sx={{
                            mx: "auto",
                            p: 1,
                            m: 1,
                            "& > :not(style)": { m: 1 },
                        }}
                    >
                        <Button variant="contained" type="submit" autoFocus>
                            Lưu
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => props.handleClose("CANCEL", undefined, clearErrors)}
                        >
                            Hủy
                        </Button>
                    </Box>
                </Card>
            </form>
        </Modal>
    );
};

export default DiseaseGroupForm;
