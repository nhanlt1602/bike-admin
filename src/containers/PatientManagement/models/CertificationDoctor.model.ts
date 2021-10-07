import { Certification } from "./Certification.model";

export type CertificationDoctor = {
    id: number;
    doctorId: number;
    certificationId: number;
    evidence: string;
    dateOfIssue: string;
    certification: Certification;
};
