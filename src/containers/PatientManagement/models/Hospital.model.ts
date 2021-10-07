import { HospitalDoctor } from "src/containers/DoctorDetail/models/Doctor.model";

export type Hospital = {
    id: number;
    hospitalCode: string;
    name: string;
    address: string;
    description: string;
    lat: number;
    long: number;
    hospitalDoctors: HospitalDoctor[];
};
