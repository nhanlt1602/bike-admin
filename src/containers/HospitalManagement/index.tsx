import CRUDTable, { IColumn } from "src/components/CRUDTable";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { Hospital } from "./models/Hospital.model";
import HospitalService from "./services/Hospital.service";

const Hospitals: React.FC = () => {
    const showSnackbar = useSnackbar();
    const colums: IColumn[] = [
        {
            field: "id",
            align: "left",
            title: "ID",
            type: "index",
            disableFilter: true,
            editable: "never",
        },
        {
            field: "hospitalCode",
            align: "left",
            title: "Mã Bệnh Viện",
        },
        {
            field: "name",
            align: "left",
            title: "Tên Bệnh viện",
        },
        {
            field: "address",
            align: "left",
            title: "Địa chỉ",
        },
        {
            field: "description",
            align: "left",
            title: "Mô tả",
            disableFilter: true,
            // render: (props: string) => {
            //     return <div style={{ backgroundColor: "red" }}>{props}</div>;
            // },
        },
    ];

    const addRowData = async (rowData: Record<string, string>, callback: any) => {
        const hospital: Hospital = {
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

    const updateRowData = async (rowData: Record<string, string>, callback: any) => {
        const hospital: Hospital = {
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
            query="http://52.221.193.237/api/v1/hospitals"
            columns={colums}
            action={{
                onAdd: (rowData, callback) => addRowData(rowData, callback),
                onDelete: true,
                onEdit: (rowData, callback) => updateRowData(rowData, callback),
            }}
        />
    );
};

export default Hospitals;
