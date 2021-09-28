import CRUDTable, { IColumn } from "src/components/CRUDTable";

import { Symptom } from "./models/Symptom.model";
import SymptomService from "./services/Symtom.service";

const Symptoms: React.FC = () => {
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
            field: "symptomCode",
            align: "left",
            title: "Mã triệu chứng",
        },
        {
            field: "name",
            align: "left",
            title: "Tên triệu chứng",
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
        let symptom: Symptom = {
            symptomCode: rowData["symptomCode"],
            name: rowData["name"],
            description: rowData["description"],
        };
        await SymptomService.create(symptom)
            .then((res) => {
                if (res.status === 201) {
                    callback();
                }
            })
            .catch((ex) => {
                // eslint-disable-next-line no-console
                console.log(ex);
            });
    };

    const updateRowData = async (rowData: Record<string, string>, callback: any) => {
        let symptom: Symptom = {
            id: Number(rowData["id"]),
            symptomCode: rowData["symptomCode"],
            name: rowData["name"],
            description: rowData["description"],
        };
        await SymptomService.update(symptom)
            .then((res) => {
                if (res.status === 200) {
                    callback();
                }
            })
            .catch((ex) => {
                // eslint-disable-next-line no-console
                console.log(ex);
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
