import { Hospital } from "./Hospital.model";

export type HospitalDoctor = {
    id: number;
    doctorId: number;
    hospitalId: number;
    isWorking: boolean;
    hospital: Hospital;
};
