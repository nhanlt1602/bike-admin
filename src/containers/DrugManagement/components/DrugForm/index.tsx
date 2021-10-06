import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import CustomizeAutocomplete from "src/components/CustomizeAutocomplete";

import { Drug } from "../../models/Drug.model";

import { Button, Card, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IDrugForm {
    data: Drug;
    opened: boolean;
    handleClose: (type: "SAVE" | "CANCEL", data?: Drug, callback?: Function) => void;
}

const DrugForm: React.FC<IDrugForm> = (props: IDrugForm) => {
    const { data } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Drug>({});

    React.useEffect(() => {
        setValue("id", data.id);
        setValue("name", data.name);
        setValue("producer", data.producer);
        setValue("drugOrigin", data.drugOrigin);
        setValue("drugForm", data.drugForm);
        setValue("drugTypeId", data.drugTypeId);
    }, [data, setValue]);

    const changeValue = (value: number) => {
        setValue("drugTypeId", value);
        clearErrors("drugTypeId");
    };

    const { ref: drugTypeIdRef, ...drugTypeIdRefProps } = register("drugTypeId", {
        min: {
            value: 1,
            message: "Phân loại thuốc không được trống",
        },
    });

    const submitHandler: SubmitHandler<Drug> = (data: Drug) => {
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
                        Thông tin Thuốc
                    </Typography>
                </Box>
                <Box
                    component="form"
                    onSubmit={handleSubmit(submitHandler)}
                    sx={{
                        "& > :not(style)": {
                            m: 2,
                            display: "flex",
                            justifyContent: "center",
                        },
                    }}
                >
                    <TextField
                        id="drug-name"
                        label="Tên thuốc *"
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name && "Tên thuốc là bắt buộc"}
                        {...register("name", { required: true })}
                    />
                    <TextField
                        id="drug-producer"
                        label="Nhà sản xuất"
                        variant="outlined"
                        {...register("producer")}
                    />
                    <TextField
                        id="drug-origin"
                        label="Xuất xứ"
                        variant="outlined"
                        {...register("drugOrigin")}
                    />
                    <TextField
                        id="drug-form"
                        label="Định dạng"
                        variant="outlined"
                        {...register("drugForm")}
                    />
                    <CustomizeAutocomplete
                        query="/drug-types"
                        field="name"
                        searchField="name"
                        limit={10}
                        label="Phân loại thuốc"
                        errors={errors.drugTypeId}
                        errorMessage={"Phân loại thuốc không được trống"}
                        inputRef={drugTypeIdRef}
                        {...drugTypeIdRefProps}
                        changeValue={changeValue}
                    />
                    <Box
                        sx={{
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

export default DrugForm;
