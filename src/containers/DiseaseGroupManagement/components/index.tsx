import React, { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { DiseaseGroup } from "../models/DiseaseGroup.model";

import { Button, Card, Modal, Stack, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IDiseaseGroupForm {
    open: boolean;
    data: DiseaseGroup;
    handleClose: (type: "SAVE" | "CANCEL", data?: DiseaseGroup, callback?: Function) => void;
}

const DiseaseGroupForm: React.FC<IDiseaseGroupForm> = (props: IDiseaseGroupForm) => {
    const { data } = props;
    const [checked, setChecked] = useState(data?.isActive);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        setValue("isActive", checked);
    };
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
        setValue("isActive", data.isActive);
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
                        Thông tin nhóm dịch bệnh
                    </Typography>
                </Box>
                <Box
                    component="form"
                    onSubmit={handleSubmit(submitHandler)}
                    sx={{
                        "& > :not(style)": {
                            m: 2,
                            display: "flex",
                            //  justifyContent: "center"
                        },
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        label="Tên nhóm dịch bệnh *"
                        variant="outlined"
                        error={!!errors.groupName}
                        helperText={errors.groupName && "Tên nhóm dịch bệnh là bắt buộc"}
                        {...register("groupName", { required: true })}
                    />
                    <Stack direction="row" spacing={0}>
                        <Typography
                            sx={{
                                // mx: "auto",
                                p: 1,
                                //
                                // "& > :not(style)": { m: 1 },
                            }}
                        >
                            Trạng thái:
                        </Typography>
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </Stack>
                    <Box
                        sx={{
                            justifyContent: "center",
                            mx: "auto",
                            p: 1,
                            m: 1,
                            "& > :not(style)": { m: 1 },
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => props.handleClose("CANCEL", undefined, clearErrors)}
                        >
                            Hủy
                        </Button>
                        <Button variant="contained" type="submit" autoFocus>
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Modal>
    );
};

export default DiseaseGroupForm;
