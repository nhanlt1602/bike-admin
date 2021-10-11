import { DiseaseGroup } from "src/containers/DiseaseGroupManagement/models/DiseaseGroup.model";

export type Disease = {
    id?: number;
    diseaseCode: string;
    name: string;
    description: string;
    diseaseGroupId: number;
    isActive: boolean;
    diseaseGroup?: DiseaseGroup;
};
