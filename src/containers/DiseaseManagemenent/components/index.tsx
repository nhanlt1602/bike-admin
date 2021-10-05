import { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
// import Select from "react-select";
import axios from "src/axios";
import { API_ROOT_URL } from "src/configurations";

import { Disease } from "../models/Disease.model";
import { Group } from "../models/Group.model";

import { Button, Card, Modal, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

// import DiseaseGroups from "src/containers/DiseaseGroupManagement";
// import { DiseaseGroup } from "src/containers/DiseaseGroupManagement/models/DiseaseGroup.model";

// import { DiseaseGroup } from "src/containers/DiseaseGroupManagement/models/DiseaseGroup.model";

export interface IDiseaseForm {
    open: boolean;
    data: Disease;
    handleClose: (type: "SAVE" | "CANCEL", data?: Disease, callback?: Function) => void;
}

const DiseaseForm: React.FC<IDiseaseForm> = (props: IDiseaseForm) => {
    const { data } = props;
    const Grouptype = [
        { id: 1, groupName: "hi4" },
        { id: 2, groupName: "hi1" },
        { id: 3, groupName: "hi2" },
    ];
    const init = {
        id: 0,
        groupName: "heloo",
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Disease>({});
    const [dataDiseaseGroup, setDataDiseaseGroup] = useState([]);
    const [age, setAge] = useState("");
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];
    const [group, setGroup] = useState<Group[]>();

    useEffect(() => {
        setValue("id", data.id);
        setValue("diseaseCode", data.diseaseCode);
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("diseaseGroupId", data.diseaseGroupId);
        setValue("diseaseGroup", data.diseaseGroup);
    }, [data, setValue]);

    const submitHandler: SubmitHandler<Disease> = (data: Disease) => {
        // eslint-disable-next-line no-console
        console.log(data);
        // if (data) {
        //     props.handleClose("SAVE", data, clearErrors);
        // }
    };

    const getDiseaseGroup = async () => {
        try {
            const response = await axios.get(
                `${API_ROOT_URL}/disease-groups?page-offset=1&limit=10`
            );
            // console.log(response.data.content);
            if (response.status === 200) {
                // setDataDiseaseGroup(response.data.content);
                // setGroup(response.data.content);

                response.data.map((item) => {
                    console.log(item);
                });
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    useEffect(() => {
        getDiseaseGroup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        <TextField
                            id="outlined-basic"
                            label="Tên nhóm dịch bệnh"
                            variant="outlined"
                            error={!!errors.name}
                            helperText={errors.name && "Tên nhóm dịch bệnh là bắt buộc"}
                            {...register("diseaseGroupId", { required: true })}
                        />

                        {/* <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            {...register("diseaseGroupId")}
                        >
                            <option disabled selected>
                                -- Select --
                            </option>
                            <option>12</option>
                            {group?.content?.map((item) => {
                                return <option key={item?.id}>{item?.groupName}</option>;
                            })}
                        </Select> */}
                        {/* <Select options={options} {...register("diseaseGroupId")} /> */}
                        <select {...register("diseaseGroupId")}>
                            {group?.map((item) => {
                                <option value={item?.content?.id} key={item?.content?.id}>
                                    {item?.content?.groupName}
                                </option>;
                            })}

                            <option value="male">ID Group</option>
                            <option value="other">Disease Group</option>
                        </select>
                        {/* <FormControl>
                            <InputLabel id="demo-simple-select-label">Nhóm dịch bệnh</InputLabel>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                variant="outlined"
                                value={age}
                                label="Age"
                                {...register("diseaseGroupId")}
                            >
                                {group?.content?.map((item) => {
                                    <MenuItem value={item.id}>{item.groupName}</MenuItem>;
                                })}
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl> */}

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
