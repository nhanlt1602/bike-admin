export type Patient = {
    id?: number;
    email?: string;
    backgroundDisease: string;
    allergy: string;
    bloodGroup: string;
    isActive: boolean;
    healthChecks?: any[];
};
