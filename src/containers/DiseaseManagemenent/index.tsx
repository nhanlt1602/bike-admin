import React from "react";

import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Disease } from "./models/Disease.model";

// interface IFormInput {
//     id: number;
//     diseaseCode: string;
//     name: string;
//     description: string;
//     diseaseGroupId: string;
//     diseaseGroup: DiseaseGroup;
// }

const Diseases: React.FC = () => {
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
        // eslint-disable-next-line no-console
        console.log("abc");
        callback();
    };

    const updateRowData = async (rowData: Disease, callback: any) => {
        // eslint-disable-next-line no-console
        console.log(rowData);
        callback();
    };

    return (
        <CRUDTable
            title="Quản lí Loại thuốc"
            enableFilter
            query={`${API_ROOT_URL}/diseases`}
            columns={colums}
            action={{
                onAdd: (callback) => addRowData(callback),
                onDelete: true,
                onEdit: (rowData, callback) => updateRowData(rowData, callback),
            }}
        />
    );
};

export default Diseases;
