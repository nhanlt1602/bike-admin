import * as React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { DrugType } from "../../models/DrugType.models";

import { Card, Modal, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

export interface IDrugTypeForm {
    open: boolean;
    data: DrugType;
    handleClose: (type: "SAVE" | "CANCEL", data?: DrugType, callback?: Function) => void;
}
const DrugTypeForm: React.FC<IDrugTypeForm> = (props: IDrugTypeForm) => {
    const { data } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<DrugType>({});

    React.useEffect(() => {
        setValue("name", data.name);
        setValue("id", data.id);
        setValue("description", data.description);
    }, [data, setValue]);

    const submitHandler: SubmitHandler<DrugType> = (data: DrugType) => {
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
                            Thông tin Loại thuốc
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            "& > :not(style)": { m: 2, display: "flex", justifyContent: "center" },
                        }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Tên loại thuốc *"
                            variant="outlined"
                            error={!!errors.name}
                            helperText={errors.name && "Tên loại thuốc là bắt buộc"}
                            {...register("name", { required: true })}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Mô tả"
                            variant="outlined"
                            defaultValue={props.data.description}
                            {...register("description")}
                            multiline
                            rows={5}
                        />

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
                    </Box>
                </Card>
            </form>
        </Modal>
    );
};

export default DrugTypeForm;
