import { Drug } from "./Drug.model";

export type Prescription = {
    id: number;
    healthCheckId: number;
    startDate: string;
    endDate: string;
    drugId: number;
    morningQuantity: number;
    afternoonQuantity: number;
    eveningQuantity: number;
    description: string;
    drug: Drug;
};
