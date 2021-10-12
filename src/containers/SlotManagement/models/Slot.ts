import { Doctor } from "src/containers/PatientManagement/models/Doctor.model";
import { HealthCheck } from "src/containers/PatientManagement/models/HealthCheck.model";

export type Slot = {
    assignedDate: string;
    doctor: Doctor;
    doctorId: number;
    endTime: number;
    healthCheck: HealthCheck;
    healthCheckId: number;
    id: number;
    isActive: boolean;
    startTime: string;
};
