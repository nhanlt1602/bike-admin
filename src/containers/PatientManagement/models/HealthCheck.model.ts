import { HealthCheckDisease } from "./HealthCheckDisease.model";
import { Patient } from "./Patient.model";
import { Prescription } from "./Prescription.model";
import { Slot } from "./Slot.model";
import { SymptomHealthCheck } from "./SymtomHealthCheck.model";

export type HealthCheck = {
    id: number;
    height: number;
    weight: number;
    reasonCancel: string;
    rating: 0;
    comment: string;
    advice: string;
    token: string;
    patientId: number;
    createdTime: string;
    canceledTime: string;
    status: string;
    patient: Patient;
    healthCheckDiseases: HealthCheckDisease[];
    prescriptions: Prescription[];
    slots: Slot[];
    symptomHealthChecks: SymptomHealthCheck[];
};
