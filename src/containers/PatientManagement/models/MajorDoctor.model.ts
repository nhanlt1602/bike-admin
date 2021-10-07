import { Major } from "./Major.model";

export type MajorDoctor = {
    id: number;
    doctorId: number;
    majorId: number;
    major: Major;
};
