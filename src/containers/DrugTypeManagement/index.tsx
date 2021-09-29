import CRUDTable, { IColumn } from "src/components/CRUDTable";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { DrugType } from "./models/DrugType.models";
import DrugTypeService from "./services/DrugType.service";

const DrugTypes: React.FC = () => {
    const showSnackbar = useSnackbar();
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

    const addRowData = async (rowData: Record<string, string>, callback: any) => {
        const drugType: DrugType = {
            name: rowData["name"],
            description: rowData["description"],
        };
        await DrugTypeService.create(drugType)
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
        const drugType: DrugType = {
            id: Number(rowData["id"]),
            name: rowData["name"],
            description: rowData["description"],
        };
        await DrugTypeService.update(drugType)
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
            title="Quản lí Loại thuốc"
            enableFilter
            query="http://52.221.193.237/api/v1/drug-types"
            columns={colums}
            action={{
                onAdd: (rowData, callback) => addRowData(rowData, callback),
                onDelete: true,
                onEdit: (rowData, callback) => updateRowData(rowData, callback),
            }}
        />
    );
};

export default DrugTypes;
