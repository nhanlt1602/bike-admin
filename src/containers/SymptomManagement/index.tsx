import React, { useState } from "react";

import { API_ROOT_URL } from "src/configurations";

import SymptomForm from "./components/SymptomForm";
import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Symptom } from "./models/Symptom.model";
import SymptomService from "./services/Symptom.service";

import { Chip } from "@mui/material";
import { Box } from "@mui/system";

const Symptoms: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const initSymptom: Symptom = {
        symptomCode: "",
        name: "",
        description: "",
        isActive: true,
    };
    const [data, setData] = useState<Symptom>(initSymptom);
    const [reload, setReload] = useState<Function>(() => {});
    const colums: IColumn[] = [
        {
            field: "id",
            align: "left",
            title: "STT",
            type: "index",
            disableFilter: true,
            editable: "never",
            disableSort: true,
            index: 1,
        },
        {
            field: "symptomCode",
            align: "left",
            title: "Mã triệu chứng",
            index: 2,
        },
        {
            field: "name",
            align: "left",
            title: "Tên triệu chứng",
            index: 3,
        },
        {
            field: "isActive",
            align: "left",
            title: "Trạng thái",
            disableSort: true,
            disableFilter: true,
            index: 4,
            render: (props: boolean) => {
                return (
                    <Box display="flex" alignItems="center" justifyContent="left">
                        <Chip
                            label={props ? "ACTIVE" : "INACTIVE"}
                            color={props ? "success" : "secondary"}
                        />
                    </Box>
                );
            },
            width: "100",
        },
    ];

    const addRowData = async (callback: Function) => {
        setOpen(true);
        setData(initSymptom);
        setReload(() => callback);
    };

    const updateRowData = async (rowData: Symptom, callback: Function) => {
        setOpen(true);
        setData(rowData);
        setReload(() => callback);
    };

    const postSymptom = async (data: Symptom) => {
        try {
            const response = await SymptomService.create(data);
            if (response.status === 201) {
                reload();
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    };

    const updateSymptom = async (data: Symptom) => {
        try {
            const response = await SymptomService.update(data);
            if (response.status === 200) {
                reload();
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    };

    const handleClose = (type: "SAVE" | "CANCEL", data?: Symptom, clearErrors?: Function) => {
        if (type === "SAVE") {
            if (data) {
                if (data.id) {
                    updateSymptom(data);
                } else {
                    postSymptom(data);
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            <SymptomForm opened={open} data={data} handleClose={handleClose} />
            <CRUDTable
                title="Quản lí Triệu Chứng"
                enableFilter
                query={`${API_ROOT_URL}/symptoms`}
                columns={colums}
                action={{
                    onAdd: (callback) => addRowData(callback),
                    onDelete: true,
                    onEdit: (rowData, callback) => updateRowData(rowData, callback),
                }}
            />
        </React.Fragment>
    );
};

export default Symptoms;
