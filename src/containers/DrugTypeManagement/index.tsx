import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { DrugType } from "./models/DrugType.models";

const DrugTypes: React.FC = () => {
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
            field: "name",
            align: "left",
            title: "Tên loại thuốc",
            index: 2,
        },
        {
            field: "description",
            align: "left",
            title: "Mô tả",
            disableFilter: true,
            index: 3,
        },
    ];

    const addRowData = async (callback: Function) => {
        // eslint-disable-next-line no-console
        console.log("abc");
        callback();
    };

    const updateRowData = async (rowData: DrugType, callback: any) => {
        // eslint-disable-next-line no-console
        console.log(rowData);
        callback();
    };
    return (
        <CRUDTable
            title="Quản lí Loại thuốc"
            enableFilter
            query={`${API_ROOT_URL}/drug-types`}
            columns={colums}
            action={{
                onAdd: (callback) => addRowData(callback),
                onDelete: true,
                onEdit: (rowData, callback) => updateRowData(rowData, callback),
            }}
        />
    );
};

export default DrugTypes;
