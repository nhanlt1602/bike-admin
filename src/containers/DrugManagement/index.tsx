import CRUDTable, { IColumn } from "src/components/CRUDTable";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { Drug } from "./models/Drug.model";
import DrugService from "./services/Drug.service";

const Drugs: React.FC = () => {
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
        { field: "name", align: "left", title: "Tên thuốc" },
        { field: "producer", align: "left", title: "Nhà sản xuất" },
        { field: "drugOrigin", align: "left", title: "Xuất xứ" },
        { field: "drugForm", align: "left", title: "Định dạng" },
        { field: "drugTypeId", align: "left", title: "Mã loại thuốc", disableFilter: true },
    ];

    const addRowData = async (rowData: Record<string, string>, callback: any) => {
        const drug: Drug = {
            name: rowData["name"],
            producer: rowData["producer"],
            drugOrigin: rowData["drugOrigin"],
            drugForm: rowData["drugForm"],
            drugTypeId: Number(rowData["drugTypeId"]),
        };
        await DrugService.create(drug)
            .then((res) => {
                if (res.status === 201) {
                    showSnackbar({
                        children: "Thêm mới thành công",
                        variant: "filled",
                        severity: "success",
                    });
                    callback();
                }
                if (res.status === 400) {
                    callback();
                    showSnackbar({
                        children: "Mã loại thuốc không tồn tại",
                        variant: "filled",
                        severity: "error",
                    });
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
        const drug: Drug = {
            id: Number(rowData["id"]),
            name: rowData["name"],
            producer: rowData["producer"],
            drugOrigin: rowData["drugOrigin"],
            drugForm: rowData["drugForm"],
            drugTypeId: Number(rowData["drugTypeId"]),
        };
        await DrugService.update(drug)
            .then((res) => {
                if (res.status === 200) {
                    callback();
                    showSnackbar({
                        children: "Chỉnh sửa thành công",
                        variant: "filled",
                        severity: "success",
                    });
                }
                if (res.status === 400) {
                    callback();
                    showSnackbar({
                        children: "Mã loại thuốc không tồn tại",
                        variant: "filled",
                        severity: "error",
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
            title="Quản lí Thuốc"
            enableFilter
            query="http://52.221.193.237/api/v1/drugs"
            columns={colums}
            action={{
                onAdd: (rowData, callback) => addRowData(rowData, callback),
                onDelete: true,
                onEdit: (rowData, callback) => updateRowData(rowData, callback),
            }}
        />
    );
};

export default Drugs;
