import { DiseaseGroup } from "./DiseaseGroup.model";
import { HealthCheckDisease } from "./HealthCheckDisease.model";

export type Disease = {
    id: number;
    name: string;
    description: string;
    diseaseGroupId: number;
    diseaseGroup: DiseaseGroup;
    healthCheckDiseases: HealthCheckDisease[];
};
