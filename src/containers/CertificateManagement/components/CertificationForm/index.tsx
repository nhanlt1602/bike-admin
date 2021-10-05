import * as React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Certificate } from "../../models/Certificate.models";

import { Card, Modal, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

export interface ICertificationForm {
    open: boolean;
    data: Certificate;
    handleClose: (type: "SAVE" | "CANCEL", data?: Certificate, callback?: Function) => void;
}
const CertificationForm: React.FC<ICertificationForm> = (props: ICertificationForm) => {
    const { data } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Certificate>({});

    React.useEffect(() => {
        setValue("name", data.name);
        setValue("id", data.id);
        setValue("description", data.description);
    }, [data, setValue]);

    const submitHandler: SubmitHandler<Certificate> = (data: Certificate, e) => {
        // eslint-disable-next-line no-console
        console.log(data);
        e?.preventDefault();
        // reset();
        if (data) {
            props.handleClose("SAVE", data, clearErrors);
        }
    };
    return (
        <Modal
            open={props.open}
            aria-labelledby="certificate-dialog"
            aria-describedby="alert-certificate-description"
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
                            Thông tin chứng chỉ
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            "& > :not(style)": { m: 2, display: "flex", justifyContent: "center" },
                        }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Tên chứng chỉ *"
                            variant="outlined"
                            error={!!errors.name}
                            helperText={errors.name && "Tên chứng chỉ là bắt buộc"}
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

export default CertificationForm;
