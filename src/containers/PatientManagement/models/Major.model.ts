import { MajorDoctor } from "./MajorDoctor.model";

export type Major = {
    id: number;
    name: string;
    description: string;
    majorDoctors: MajorDoctor[];
};
