import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { DiseaseGroup } from "./models/DiseaseGroup.model";

const DiseaseGroups: React.FC = () => {
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
            field: "groupName",
            align: "left",
            title: "Nhóm dịch bệnh",
            index: 2,
        },
    ];
    const addRowData = async (callback: Function) => {
        // eslint-disable-next-line no-console
        console.log("abc");
        callback();
    };

    const updateRowData = async (rowData: DiseaseGroup, callback: any) => {
        // eslint-disable-next-line no-console
        console.log(rowData);
        callback();
    };
    return (
        <CRUDTable
            title="Quản lí nhóm dịch bệnh"
            enableFilter
            query="http://52.221.193.237/api/v1/disease-groups"
            columns={colums}
            action={{
                onAdd: (callback) => addRowData(callback),
                onDelete: true,
                onEdit: (rowData, callback) => updateRowData(rowData, callback),
            }}
        />
    );
};

export default DiseaseGroups;
