import React, { useState } from "react";

import { API_ROOT_URL } from "src/configurations";

import DiseaseForm from "./components/DiseaseForm";
import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { DiseaseGroup } from "../DiseaseGroupManagement/models/DiseaseGroup.model";
import { Disease } from "./models/Disease.model";
import DiseaseService from "./services/Disease.service";

export type initDiseaseGroup = {
    id: 0;
    groupName: "hi";
};
const Diseases: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const initDisease: Disease = {
        diseaseCode: "",
        name: "",
        description: "",
        diseaseGroupId: 0,
        // diseaseGroup: [{ 1: "Oke" }, { 2: "Good" }],
    };

    // const [dataDiseaseGroup, setDataDiseaseGroup] = useState<DiseaseGroup>(initDiseaseGroup);
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
            width: "150",
        },
        {
            field: "name",
            align: "left",
            title: "Tên dịch bệnh",
            index: 3,
        },
        // {
        //     field: "description",
        //     align: "left",
        //     title: "Mô tả",
        //     disableFilter: true,
        //     index: 4,
        // },
        // {
        //     field: "diseaseGroupId",
        //     align: "left",
        //     title: "Mã nhóm dịch bệnh",
        //     index: 5,
        // },
        {
            field: "diseaseGroup",
            align: "left",
            title: "Nhóm dịch bệnh",
            index: 4,
            render: (props: DiseaseGroup) => {
                return <React.Fragment>{props.groupName}</React.Fragment>;
            },
        },
    ];
    // const getDiseaseGroup = async () => {
    //     try {
    //         const response = await axios.get(`${API_ROOT_URL}/disease-groups?limit=1&offset=20`);
    //         console.log(response.data);
    //         if (response.status === 200) {
    //             setDataDiseaseGroup(response.data.content);
    //         }
    //     } catch (error) {
    //         // eslint-disable-next-line no-console
    //         console.log(error);
    //     }
    // };

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
                query={`${API_ROOT_URL}/diseases`}
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
