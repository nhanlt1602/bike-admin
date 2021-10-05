import React from "react";

import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { DrugType } from "../DrugTypeManagement/models/DrugType.models";
import { Drug } from "./models/Drug.model";

const Drugs: React.FC = () => {
    // const showSnackbar = useSnackbar();
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
        { field: "name", align: "left", title: "Tên thuốc", index: 2 },
        { field: "producer", align: "left", title: "Nhà sản xuất", index: 3 },
        { field: "drugOrigin", align: "left", title: "Xuất xứ", index: 4 },
        { field: "drugForm", align: "left", title: "Định dạng", index: 5 },
        {
            field: "drugType",
            align: "left",
            title: "Loại thuốc",
            disableFilter: true,
            index: 6,
            render: (props: DrugType) => {
                return <React.Fragment>{props.name}</React.Fragment>;
            },
        },
    ];

    const addRowData = async (callback: Function) => {
        // eslint-disable-next-line no-console
        console.log("abc");
        callback();
    };

    const updateRowData = async (rowData: Drug, callback: any) => {
        // eslint-disable-next-line no-console
        console.log(rowData);
        callback();
    };
    return (
        <CRUDTable
            title="Quản lí Thuốc"
            enableFilter
            query={`${API_ROOT_URL}/drugs`}
            columns={colums}
            action={{
                onAdd: (callback) => addRowData(callback),
                onDelete: true,
                onEdit: (rowData, callback) => updateRowData(rowData, callback),
            }}
        />
    );
};

export default Drugs;
