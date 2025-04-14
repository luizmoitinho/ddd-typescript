import { CustomerFactory } from "../../../domain/customer/factory/customer.factory"
import { Address } from "../../../domain/customer/value-object/address"
import UpdateCustomerUseCase from "./update.customer.usecase"

describe('unit test for customer update use case', ()=>{
    const customer = CustomerFactory.createWithAddress("John", new Address("Street 1", 123, "2134-123", "City 1"))

    const updateInput = {
        id: customer.id,
        name: "Jon Updated",
        address: {
            street: "Street 1 Updated",
            city: "City 1 Updated",
            number: 321,
            zipCode: "Updated-123"
        }
    }

    const mockRepository = () => {
        return {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            find: jest.fn().mockResolvedValue(Promise.resolve(customer)),
        }
    }

    it('should update a customer', async()=>{
        const customerRepository = mockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

        const got = await customerUpdateUseCase.execute(updateInput)

        expect(got).toEqual({
            name: "Jon Updated",
            address: {
                street: "Street 1 Updated",
                city: "City 1 Updated",
                number: 321,
                zipCode: "Updated-123"
            }
        })
    })
})