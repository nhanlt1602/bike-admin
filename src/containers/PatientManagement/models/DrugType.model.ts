import { Drug } from "./Drug.model";

export type DrugType = {
    id: number;
    name: string;
    description: string;
    drug: Drug[];
};
