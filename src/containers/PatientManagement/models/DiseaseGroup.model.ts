import { Disease } from "./Disease.model";

export type DiseaseGroup = {
    id: number;
    groupName: string;
    diseases: Disease[];
};
