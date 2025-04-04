import { Address } from "../../../domain/customer/value-object/address";

export interface InputFindCustomerDto{
    id: string;
};

export interface OutputFindCustomerDto{
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zipCode: string;
    };
};