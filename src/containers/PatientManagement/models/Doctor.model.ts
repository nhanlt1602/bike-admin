import { CertificationDoctor } from "./CertificationDoctor.model";
import { HospitalDoctor } from "./HospitalDoctor.model";
import { MajorDoctor } from "./MajorDoctor.model";
import { Slot } from "./Slot.model";

export type Doctor = {
    id: number;
    email: string;
    practisingCertificate: string;
    certificateCode: string;
    placeOfCertificate: string;
    dateOfCertificate: string;
    scopeOfPractice: string;
    description: string;
    numberOfConsultants: number;
    rating: number;
    isVerify: boolean;
    certificationDoctors: CertificationDoctor[];
    hospitalDoctors: HospitalDoctor[];
    majorDoctors: MajorDoctor[];
    slots: Slot[];
};
