import { Patient } from "src/containers/PatientDetail/models/Patient.model";

export type HealthCheck = {
    id?: number;
    heght: number;
    weight: number;
    reasonCancel: string;
    rating: string;
    comment: string;
    advice: string;
    token: string;
    paatientId: number;
    createdTime: string;
    canceledTime: string;
    patient?: Patient;
    healthCheckDiseases?: [];
    prescription: [];
    slots: [];
    symptomHealthChecks: [];
};
