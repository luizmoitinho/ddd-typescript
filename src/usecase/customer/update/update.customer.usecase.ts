import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface"
import { Address } from "../../../domain/customer/value-object/address"
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer"


export default class UpdateCustomerUseCase{
    private customerRepository: CustomerRepositoryInterface

    constructor(repository: CustomerRepositoryInterface){
        this.customerRepository = repository
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto>{
        const customer = await this.customerRepository.find(input.id)

        if(!customer || !customer?.id){
            throw new Error("customer not found")
        }

        customer.changeName(input.name)
        customer.changeAddress(
            new Address( 
                input.address.street,
                input.address.number,
                input.address.zipCode,
                input.address.city
            )
        )

        await this.customerRepository.update(customer)

        return <OutputUpdateCustomerDto>{
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zipCode: customer.Address.zipCode,
                city: customer.Address.city
            }
        }
    }
}

