import { Symptom } from "./Symptom.model";

export type SymptomHealthCheck = {
    id: number;
    symptomId: number;
    healthCheckId: number;
    evidence: string;
    symptom: Symptom;
};
