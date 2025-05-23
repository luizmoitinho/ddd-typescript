import { CreateCustomerUseCase } from "./create.customer.usecase";

describe('Unit test to create customer use case', ()=>{
    const inputCustomerDto = {
        name: "John",
        address: {
                street: "Street 1",
                city: "City 1",
                number: 123,
                zipCode: "1234-123"
        }
    }

    const customerMockRepository = ()=>{
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn()
        }
    };

    it("should create a customer", async()=>{
        const customerRepository = customerMockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

        const got = await customerCreateUseCase.execute(inputCustomerDto)

        const expected = {
            id: expect.any(String),
            name: inputCustomerDto.name,
            address: {
                street: inputCustomerDto.address.street,
                city: inputCustomerDto.address.city,
                number: inputCustomerDto.address.number,
                zipCode: inputCustomerDto.address.zipCode,
            }
        }

        expect(got).toEqual(expected)

    })

    it("should thrown an error when name is missing", async()=>{
        const input = inputCustomerDto
        input.name = "";

        const customerRepository = customerMockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Customer: name is required")    
    });

    it("should thrown an error when street is missing", async()=>{
        const input = inputCustomerDto
        input.address.street = "";

        const customerRepository = customerMockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("street is required")    
    });
})