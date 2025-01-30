import { Address } from "../value-object/address";
import { CustomerFactory } from "./customer.factory";

describe('Customer factory unit tests', () => {
    it('should create a customer', () => {
        const customer = CustomerFactory.create('Luiz Moitinho');

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe('Luiz Moitinho');
        expect(customer.Address).toBeUndefined()
    });


    it('should create a customer', () => {
        const address = new Address('Street 1', 1, 'ZipCode 1', 'City 1')
        const customer = CustomerFactory.createWithAddress('Luiz Moitinho', address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe('Luiz Moitinho');
        expect(customer.Address).toEqual(new Address('Street 1', 1, 'ZipCode 1', 'City 1'))
    });
})