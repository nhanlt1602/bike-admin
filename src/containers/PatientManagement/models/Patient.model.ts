import { HealthCheck } from "./HealthCheck.model";

export type Patient = {
    id?: number;
    email: string;
    backgroundDisease: string;
    allergy: string;
    bloodGroup: string;
    healthChecks?: HealthCheck[];
};
