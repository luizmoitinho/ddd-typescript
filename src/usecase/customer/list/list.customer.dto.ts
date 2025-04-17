
 type Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zipCode: string;
    };
};

export interface InputListCustomerDto{}

export interface OuputListCustomerDto{
    customers: Customer[] 
}