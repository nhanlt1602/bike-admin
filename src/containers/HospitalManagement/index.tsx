import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Hospital } from "./models/Hospital.model";

const Hospitals: React.FC = () => {
    const colums: IColumn[] = [
        {
            field: "stt",
            align: "left",
            title: "STT",
            type: "index",
            disableFilter: true,
            editable: "never",
            index: 1,
            disableSort: true,
        },
        {
            field: "hospitalCode",
            align: "left",
            title: "Mã Bệnh Viện",
            index: 2,
        },
        {
            field: "name",
            align: "left",
            title: "Tên Bệnh viện",
            index: 3,
        },
        {
            field: "address",
            align: "left",
            title: "Địa chỉ",
            index: 4,
        },
        {
            field: "description",
            align: "left",
            title: "Mô tả",
            disableFilter: true,
            disableSort: true,
            index: 5,
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

    const updateRowData = async (rowData: Hospital, callback: any) => {
        // eslint-disable-next-line no-console
        console.log(rowData);
        callback();
    };
    return (
        <CRUDTable
            title="Quản lí Bệnh Viện"
            enableFilter
            query={`${API_ROOT_URL}/hospitals`}
            columns={colums}
            sort
            action={{
                onAdd: (callback) => addRowData(callback),
                onDelete: true,
                onEdit: (rowData, callback) => updateRowData(rowData, callback),
            }}
        />
    );
};

export default Hospitals;
