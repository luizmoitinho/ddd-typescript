import { CustomerFactory } from "../../../domain/customer/factory/customer.factory"
import { Address } from "../../../domain/customer/value-object/address"
import ListCustomerUseCase from "./list.customer.usecase"

describe('unit test for list customers use case', ()=>{
    const firstCustomer = CustomerFactory.createWithAddress(
        'John', new Address('street', 123, '1234-123', 'City')
    )
    const secondCustomer = CustomerFactory.createWithAddress(
        'Doe', new Address('street 2', 321, '0000-000', 'City 2')
    )

    const mockrepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([firstCustomer, secondCustomer])),
        }
    }

    it('unit test for customer update use case', async()=>{
        const repository = mockrepository();
        const useCase = new ListCustomerUseCase(repository);

        const got = await useCase.execute({});

        expect(got.customers.length).toBe(2)
        expect(got.customers[0].id).toBe(firstCustomer.id)
        expect(got.customers[0].name).toBe(firstCustomer.name)
        expect(got.customers[0].address.street).toBe(firstCustomer.Address.street)
        expect(got.customers[0].address.city).toBe(firstCustomer.Address.city)
        expect(got.customers[0].address.number).toBe(firstCustomer.Address. number)
        expect(got.customers[0].address.zipCode).toBe(firstCustomer.Address.zipCode)


        expect(got.customers.length).toBe(2)
        expect(got.customers[1].id).toBe(secondCustomer.id)
        expect(got.customers[1].name).toBe(secondCustomer.name)
        expect(got.customers[1].address.street).toBe(secondCustomer.Address.street)
        expect(got.customers[1].address.city).toBe(secondCustomer.Address.city)
        expect(got.customers[1].address.number).toBe(secondCustomer.Address. number)
        expect(got.customers[1].address.zipCode).toBe(secondCustomer.Address.zipCode)


    })
})