export type Patient = {
    id?: number;
    email?: string;
    backgroundDisease: string;
    allergy: string;
    bloodGroup: string;
    healthChecks?: any[];
    name: string;
    avatar?: string;
};
