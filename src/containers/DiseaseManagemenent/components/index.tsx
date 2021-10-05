import { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import CustomizeAutocomplete from "src/components/CustomizeAutocomplete";

import { Disease } from "../models/Disease.model";

import { Button, Card, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IDiseaseForm {
    open: boolean;
    data: Disease;
    handleClose: (type: "SAVE" | "CANCEL", data?: Disease, callback?: Function) => void;
}

const DiseaseForm: React.FC<IDiseaseForm> = (props: IDiseaseForm) => {
    const { data } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Disease>({});
    // const [group, setGroup] = useState<Group[]>();

    useEffect(() => {
        setValue("id", data.id);
        setValue("diseaseCode", data.diseaseCode);
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("diseaseGroupId", data.diseaseGroupId);
        // setValue("diseaseGroup", data.diseaseGroup);
    }, [data, setValue]);

    const submitHandler: SubmitHandler<Disease> = (data: Disease) => {
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
                            label="Mã dịch bệnh"
                            variant="outlined"
                            error={!!errors.diseaseCode}
                            helperText={errors.diseaseCode && "Mã dịch bệnh là bắt buộc"}
                            {...register("diseaseCode", { required: true })}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Tên dịch bệnh"
                            variant="outlined"
                            error={!!errors.name}
                            helperText={errors.name && "Tên dịch bệnh là bắt buộc"}
                            {...register("name", { required: true })}
                        />
                        {/* <Select
                            sx={{ maxWidth: 180 }}
                            label="Nhóm dịch bệnh"
                            labelId="demo-simple-select-label"
                            {...register("diseaseGroupId")}
                        >
                            {group?.map((item) => (
                                <MenuItem value={item?.id} key={item?.id}>
                                    {item?.groupName}
                                </MenuItem>
                            ))}
                        </Select> */}
                        <CustomizeAutocomplete
                            query="/disease-groups"
                            limit={77}
                            {...register("diseaseGroupId")}
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

export default DiseaseForm;
