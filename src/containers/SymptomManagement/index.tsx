import CRUDTable, { IColumn } from "src/components/CRUDTable";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { Symptom } from "./models/Symptom.model";
import SymptomService from "./services/Symtom.service";

const Symptoms: React.FC = () => {
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

    const addRowData = async (rowData: Record<string, string>, callback: Function) => {
        const symptom: Symptom = {
            symptomCode: rowData["symptomCode"],
            name: rowData["name"],
            description: rowData["description"],
        };
        await SymptomService.create(symptom)
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
        const symptom: Symptom = {
            id: Number(rowData["id"]),
            symptomCode: rowData["symptomCode"],
            name: rowData["name"],
            description: rowData["description"],
        };
        await SymptomService.update(symptom)
            .then((res) => {
                if (res.status === 200) {
                    showSnackbar({
                        children: "Chỉnh sửa thành công",
                        variant: "filled",
                        severity: "success",
                    });
                    callback();
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
            title="Quản lí Triệu Chứng"
            enableFilter
            query="http://52.221.193.237/api/v1/symptoms"
            columns={colums}
            action={{
                onAdd: (rowData, callback) => addRowData(rowData, callback),
                onDelete: true,
                onEdit: (rowData, callback) => updateRowData(rowData, callback),
            }}
        />
    );
};

export default Symptoms;
