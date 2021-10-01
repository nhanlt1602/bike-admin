// type HealthCheck = {
//     id: number;
//     height: number;
//     reasonCancel: string;
//     rating: number;
//     comment: string;
//     advice: string;
//     token: string;
//     patientId: number;
//     createdTime: string;
//     canceledTime: string;
//     patient: Patient;
//     healthCheckDiseases?: any[];
//     prescriptions?: any[];
//     slots?: any[];
//     symptomHealthChecks?: any[];
// };

export type Patient = {
    id?: number;
    email?: string;
    backgroundDisease: string;
    allergy: string;
    bloodGroup: string;
    healthChecks?: any[];
};
