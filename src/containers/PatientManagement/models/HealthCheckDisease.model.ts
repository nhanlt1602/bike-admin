import { Disease } from "./Disease.model";

export type HealthCheckDisease = {
    id: number;
    healthCheckId: number;
    diseaseId: number;
    disease: Disease;
};
