export type Account = {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    streetAddress: string;
    locality: string;
    city: string;
    postalCode: string;
    phone: string;
    dob: string;
    isMale: boolean;
    active: boolean;
    registerTime: string;
    role: {
        id: string;
        name: string;
    };
};
