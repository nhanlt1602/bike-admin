import { CertificationDoctor } from "./CertificationDoctor.model";

export type Certification = {
    id: number;
    name: string;
    description: string;
    certificationDoctors?: CertificationDoctor[];
};
