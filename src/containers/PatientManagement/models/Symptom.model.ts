import { SymptomHealthCheck } from "./SymtomHealthCheck.model";

export type Symptom = {
    id: number;
    symptomCode: string;
    name: string;
    description: string;
    symptomHealthChecks: Array<SymptomHealthCheck>;
};
