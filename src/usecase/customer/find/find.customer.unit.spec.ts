import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

describe('Unit test find customer use case', ()=>{
    const customerMockRepository = ()=>{
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn()
        }
    };
    
    it('should find a customer', async() => {
        //arrange
        const address = new Address("Street 1", 123, "1234-123", "City 1")
        const customer = new Customer("123", "John")
        customer.changeAddress(address)
        
        const customerRepository = customerMockRepository();
        customerRepository.find.mockReturnValue(customer)

        const input: InputFindCustomerDto = {
            id: "123"
        }

        const want: OutputFindCustomerDto = {
            id: "123",
            name: "John",
            address: {
                street: "Street 1",
                city: "City 1",
                number: 123,
                zipCode: "1234-123"
            }
        }

        const spy = jest.spyOn(customerRepository, "find")

        //act
        const useCase = new FindCustomerUseCase(customerRepository)
        const got = await useCase.execute(input)

        //assert
        expect(got).toEqual(want)
        expect(customerRepository.find).toHaveBeenCalledWith("123")
    })

    it("should return not find a customer", ()=>{
        //arrange
        const input: InputFindCustomerDto = {
            id: "123"
        }
        
        const customerRepository = customerMockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("customer not found")
        })
        const useCase = new FindCustomerUseCase(customerRepository)



        expect(()=>{
            return useCase.execute(input)
        }).rejects.toThrow("customer not found")

    })

})