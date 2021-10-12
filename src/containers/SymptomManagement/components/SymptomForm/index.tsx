import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Symptom } from "../../models/Symptom.model";

import { Button, Card, Modal, Stack, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface ISymptomForm {
    data: Symptom;
    opened: boolean;
    handleClose: (type: "SAVE" | "CANCEL", data?: Symptom, callback?: Function) => void;
}

const SymptomForm: React.FC<ISymptomForm> = (props: ISymptomForm) => {
    const { data } = props;
    const [checked, setChecked] = React.useState<boolean>(data.isActive);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        // eslint-disable-next-line no-console
        console.log(event.target.checked); //true
        if (event.target.checked === true) {
            setValue("isActive", true);
        } else if (event.target.checked === false) {
            setValue("isActive", false);
        } else {
            // eslint-disable-next-line no-console
            console.log(event.target.checked);
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Symptom>({});

    React.useEffect(() => {
        setValue("id", data.id);
        setValue("symptomCode", data.symptomCode);
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("isActive", data.isActive);
        setChecked(data.isActive);
    }, [data, setValue, setChecked]);

    const submitHandler: SubmitHandler<Symptom> = (data: Symptom) => {
        // eslint-disable-next-line no-console
        console.log(data);
        if (data) {
            props.handleClose("SAVE", data, clearErrors);
        }
    };

    return (
        <Modal open={props.opened}>
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
                        Thông tin Triệu chứng
                    </Typography>
                </Box>
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": {
                            m: 2,
                            display: "flex",
                            // justifyContent: "center",
                        },
                    }}
                >
                    <TextField
                        id="symptom-code"
                        label="Mã triệu chứng *"
                        variant="outlined"
                        defaultValue={props.data.symptomCode}
                        error={!!errors.symptomCode}
                        helperText={errors.symptomCode && "Mã triệu chứng là bắt buộc"}
                        {...register("symptomCode", { required: true })}
                    />
                    <TextField
                        id="symptom-name"
                        label="Tên triệu chứng *"
                        variant="outlined"
                        defaultValue={props.data.name}
                        error={!!errors.name}
                        helperText={errors.name && "Tên triệu chứng là bắt buộc"}
                        {...register("name", { required: true })}
                    />
                    <TextField
                        id="description"
                        label="Mô tả"
                        variant="outlined"
                        defaultValue={props.data.description}
                        {...register("description")}
                        multiline
                        rows={5}
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
                        <Button variant="contained" onClick={handleSubmit(submitHandler)} autoFocus>
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Modal>
    );
};

export default SymptomForm;
