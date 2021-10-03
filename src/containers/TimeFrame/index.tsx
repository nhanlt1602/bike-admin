import React from "react";

import { useForm } from "react-hook-form";

import CRUDTable, { IColumn } from "../../components/CRUDTable";
import { makeStyles, TextField } from "@material-ui/core";
import ButtonBase from "src/components/Button/ButtonBase";

import { API_ROOT_URL } from "../../configurations";

import { Box } from "@mui/system";
import useGenerateTimeFrame from "src/hooks/useGenerateTimeFrame";

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        columnGap: 10,
        rowGap: 20,
    },
}));

const TimeFrames: React.FC = () => {
    const classes = useStyles();
    const { handleGenerateTimeFrame } = useGenerateTimeFrame();
    const columns: IColumn[] = [
        {
            field: "id",
            align: "left",
            title: "Slot",
            type: "index",
            disableFilter: true,
            editable: "never",
            index: 1,
        },
        {
            field: "startTime",
            align: "left",
            title: "Thời gian bắt đầu",
            index: 2,
        },
        {
            field: "endTime",
            align: "left",
            title: "Thời gian kết thúc",
            index: 3,
        },
    ];

    const {
        register,
        getValues,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm();

    const convert_minutes = (time: string) => {
        var a = time.split(":");
        return +a[0] * 60 + +a[1];
    };

    const submitHandler = () => {
        clearErrors();
        handleGenerateTimeFrame(
            getValues("timeStart"),
            getValues("timeEnd"),
            getValues("timeRange")
        );
    };

    return (
        <React.Fragment>
            <form
                autoComplete="off"
                className={classes.form}
                noValidate
                onSubmit={handleSubmit(submitHandler)}
            >
                <Box minWidth={200}>
                    <TextField
                        type="time"
                        error={Boolean(errors.timeStart)}
                        helperText={Boolean(errors.timeStart) && errors.timeStart?.message}
                        label="Thời gian start:"
                        {...register("timeStart", {
                            required: "Thời gian kết thúc không được để trống!",
                        })}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                </Box>
                <Box minWidth={200}>
                    <TextField
                        type="time"
                        label="Thời gian kết thúc:"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                        {...register("timeEnd", {
                            required: "Thời gian kết thúc không được để trống!",
                            validate: (value) =>
                                convert_minutes(value) > convert_minutes(getValues("timeStart")) ||
                                "Thời gian kết thúc cần lớn hơn thời gian bắt đầu",
                        })}
                        error={Boolean(errors.timeEnd)}
                        helperText={Boolean(errors.timeEnd) && errors.timeEnd?.message}
                    />
                </Box>
                <Box minWidth={200}>
                    <TextField
                        type="number"
                        label="Thời gian cho một slot:"
                        defaultValue="0"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register("timeRange", {
                            required: "Khoảng thời gian không được để trống!",
                            validate: (value) => value > 10 || "Khoảng thời gian cần lớn hơn 10",
                        })}
                        error={Boolean(errors.timeRange)}
                        helperText={Boolean(errors.timeRange) && errors.timeRange?.message}
                    />
                </Box>
                <ButtonBase type="submit" variant="contained">
                    Tạo thời gian
                </ButtonBase>
            </form>
            <Box height={24} />
            <CRUDTable
                title="Khung thời gian"
                query={`${API_ROOT_URL}/time-frames`}
                columns={columns}
                action={{
                    onDelete: true,
                }}
            />
            <Box height={20} />
        </React.Fragment>
    );
};

export default TimeFrames;
