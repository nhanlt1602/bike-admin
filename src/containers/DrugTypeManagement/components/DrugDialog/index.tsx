import * as React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { DrugType } from "../../models/DrugType.models";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export interface IDrugDialog {
    open: boolean;
    data: DrugType;
    handleClose: (type: "SAVE" | "CANCEL", data?: DrugType, callback?: Function) => void;
}
const DrugDialog: React.FC<IDrugDialog> = (props: IDrugDialog) => {
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
        <Dialog
            open={props.open}
            aria-labelledby="drugtype-dialog"
            aria-describedby="alert-drugtype-description"
        >
            <form onSubmit={handleSubmit(submitHandler)}>
                <DialogTitle id="drugtype-dialog-title">{"Loại thuốc"}</DialogTitle>
                <DialogContent>
                    <TextField
                        {...register("name", { required: true })}
                        fullWidth
                        label="Tên loại thuốc"
                    />
                    {errors.name && <p>Name is required.</p>}
                    <TextField fullWidth multiline {...register("description")} label="Mô tả" />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" autoFocus>
                        LƯU
                    </Button>
                    <Button
                        onClick={() => props.handleClose("CANCEL", undefined, clearErrors)}
                        color="secondary"
                    >
                        HỦY
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DrugDialog;
