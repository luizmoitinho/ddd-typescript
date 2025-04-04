import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequilize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequilize/customer.repository";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

describe('Integration test find customer use case', ()=>{
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize =  new Sequelize(
            {
                dialect: 'sqlite',
                storage: ':memory:',
                logging: false,
                sync: { force: true}
            }
        );
        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })

    afterEach( async() => {
        await sequelize.close()
    })
    
    it('should find a customer', async() => {
        //arrange
        const address = new Address("Street 1", 123, "1234-123", "City 1")
        const customer = new Customer("123", "John")
        customer.changeAddress(address)
        
        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer)

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

        //act
        const useCase = new FindCustomerUseCase(customerRepository)
        const got = await useCase.execute(input)

        //assert
        expect(got).toEqual(want)
    })
})