import { DrugType } from "./DrugType.model";
import { Prescription } from "./Prescription.model";

export type Drug = {
    id: number;
    name: string;
    producer: string;
    drugOrigin: string;
    drugForm: string;
    drugTypeId: number;
    drugType: DrugType;
    prescriptions?: Prescription[];
};
