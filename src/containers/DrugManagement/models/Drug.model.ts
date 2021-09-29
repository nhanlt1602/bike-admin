import { DrugType } from "src/containers/DrugTypeManagement/models/DrugType.models";

export type Drug = {
    id?: number;
    name: string;
    producer: string;
    drugOrigin: string;
    drugForm: string;
    drugType?: DrugType;
    drugTypeId: number;
};
