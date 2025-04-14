export interface InputUpdateCustomerDto {
    id: string
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zipCode: string;
    };
}

export interface OutputUpdateCustomerDto {
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zipCode: string;
    };
}