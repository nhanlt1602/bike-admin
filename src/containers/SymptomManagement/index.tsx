import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Symptom } from "./models/Symptom.model";

const Symptoms: React.FC = () => {
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
            field: "description",
            align: "left",
            title: "Mô tả",
            disableFilter: true,
            index: 4,
            // render: (props: string) => {
            //     return <div style={{ backgroundColor: "red" }}>{props}</div>;
            // },
        },
    ];

    const addRowData = async (callback: Function) => {
        // eslint-disable-next-line no-console
        console.log("abc");
        callback();
    };

    const updateRowData = async (rowData: Symptom, callback: any) => {
        // eslint-disable-next-line no-console
        console.log(rowData);
        callback();
    };

    return (
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
    );
};

export default Symptoms;
