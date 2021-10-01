import { API_ROOT_URL } from "src/configurations";

import CRUDTable, { IColumn } from "src/components/CRUDTable";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { Hospital } from "./models/Hospital.model";
import HospitalService from "./services/Hospital.service";

const Hospitals: React.FC = () => {
    const showSnackbar = useSnackbar();
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

    const addRowData = async (rowData: Record<string, string>, callback: Function) => {
        let hospital: Hospital = {
            address: rowData["address"],
            hospitalCode: rowData["hospitalCode"],
            name: rowData["name"],
            description: rowData["description"],
        };
        await HospitalService.create(hospital)
            .then((res) => {
                if (res.status === 201) {
                    showSnackbar({
                        children: "Thêm mới thành công",
                        variant: "filled",
                        severity: "success",
                    });
                    callback();
                }
            })
            .catch(() => {
                showSnackbar({
                    children: "Thêm mới thất bại",
                    variant: "filled",
                    severity: "error",
                });
            });
    };

    const updateRowData = async (rowData: Record<string, string>, callback: Function) => {
        let hospital: Hospital = {
            id: Number(rowData["id"]),
            address: rowData["address"],
            hospitalCode: rowData["hospitalCode"],
            name: rowData["name"],
            description: rowData["description"],
        };
        await HospitalService.update(hospital)
            .then((res) => {
                if (res.status === 200) {
                    callback();
                    showSnackbar({
                        children: "Chỉnh sửa thành công",
                        variant: "filled",
                        severity: "success",
                    });
                }
            })
            .catch(() => {
                showSnackbar({
                    children: "Chỉnh sửa thất bại",
                    variant: "filled",
                    severity: "error",
                });
            });
    };
    return (
        <CRUDTable
            title="Quản lí Bệnh Viện"
            enableFilter
            query={`${API_ROOT_URL}/hospitals`}
            columns={colums}
            sort
            action={{
                onAdd: (rowData, callback) => addRowData(rowData, callback),
                onDelete: true,
                onEdit: (rowData, callback) => updateRowData(rowData, callback),
            }}
        />
    );
};

export default Hospitals;
