import { Doctor } from "./Doctor.model";
import { HealthCheck } from "./HealthCheck.model";

export type Slot = {
    id: number;
    assignedDate: string;
    doctorId: number;
    startTime: string;
    endTime: string;
    healthCheckId: number;
    doctor: Doctor;
    healthCheck: HealthCheck;
};
