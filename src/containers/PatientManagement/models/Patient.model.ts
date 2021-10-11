import { HealthCheck } from "./HealthCheck.model";

export type Patient = {
    id?: number;
    name: string;
    avatar: string;
    email: string;
    backgroundDisease: string;
    allergy: string;
    bloodGroup: string;
    healthChecks?: HealthCheck[];
};
