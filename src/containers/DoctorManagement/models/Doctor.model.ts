export type Doctors = {
    id?: string;
    email: string;
    practisingCertificate: string;
    certificateCode: string;
    placeOfCertificate: string;
    dateOfCertificate: string;
    scopeOfPractice: string;
    description: string;
    numberOfConsultants: string;
    rating: string;
    isVerify: string;
    certificationDoctors: Cetification[];
    hospitalDoctors: HospitalDoctor[];
    majorDoctors: Major[];
};

export type Major = {
    id: string;
    doctorId: string;
    majorId: string;
    major: {
        id: string;
        name: string;
        description: string;
    };
};
export type HospitalDoctor = {
    id?: string;
    doctorId: string;
    hospitalId: string;
    isWorking: string;
    hospital: {
        id: string;
        name: string;
        address: string;
        description: string;
        lat: string;
        long: string;
    };
};

export type Cetification = {
    id?: string;
    doctorId: string;
    certificationId: string;
    evidence?: string;
    dateOfIssue: string;
    certification: {
        id: string;
        name: string;
        description: string;
    };
};
