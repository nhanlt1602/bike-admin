import React, { useState } from "react";

import { API_ROOT_URL } from "src/configurations";

import DiseaseForm from "./components";
import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Disease } from "./models/Disease.model";
import DiseaseService from "./services/Disease.service";

const Diseases: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const initDisease: Disease = {
        diseaseCode: "",
        name: "",
        description: "",
        diseaseGroupId: "",
    };

    const [data, setData] = useState<Disease>(initDisease);
    const [reload, setReload] = useState<Function>(() => {});
    const colums: IColumn[] = [
        {
            field: "id",
            align: "left",
            title: "ID",
            type: "index",
            disableFilter: true,
            editable: "never",
            index: 1,
        },
        {
            field: "diseaseCode",
            align: "left",
            title: "Mã dịch bệnh",
            index: 2,
        },
        {
            field: "name",
            align: "left",
            title: "Tên dịch bệnh",
            index: 3,
        },
        {
            field: "description",
            align: "left",
            title: "Mô tả",
            disableFilter: true,
            index: 4,
            // render: (props: string) => {
            //     return <div style={{ backgroundColor: "red" }}>{props}</div>;
            // },
        },
        {
            field: "diseaseGroupId",
            align: "left",
            title: "Mã nhóm dịch bệnh",
            index: 5,
        },
        // {
        //     field: "diseaseGroup",
        //     align: "left",
        //     title: "Nhóm dịch bệnh",
        //     disableFilter: true,
        //     render: (props: string) => {
        //         return <div style={{ backgroundColor: "red" }}>{props}</div>;
        //     },
        // },
    ];

    const addRowData = async (callback: Function) => {
        setOpen(true);
        setData(initDisease);
        setReload(() => callback);
    };

    const updateRowData = async (rowData: Disease, callback: Function) => {
        setOpen(true);
        setData(rowData);
        setReload(() => callback);
    };

    const postDiseaseGroup = async (data: Disease) => {
        try {
            const response = await DiseaseService.create(data);
            if (response.status === 201) {
                reload();
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    const updateDiseaseGroup = async (data: Disease) => {
        try {
            const response = await DiseaseService.update(data);
            if (response.status === 200) {
                reload();
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    };

    const handleClose = (type: "SAVE" | "CANCEL", data?: Disease, clearErrors?: Function) => {
        if (type === "SAVE") {
            if (data) {
                if (data.id) {
                    updateDiseaseGroup(data);
                } else {
                    postDiseaseGroup(data);
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
            <DiseaseForm data={data} open={open} handleClose={handleClose} />
            <CRUDTable
                title="Quản lí dịch bệnh"
                enableFilter
                query={`${API_ROOT_URL}/disease-groups`}
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

export default Diseases;
