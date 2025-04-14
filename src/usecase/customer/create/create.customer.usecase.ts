import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { Address } from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
 import { v4 as uuid } from "uuid";

export class CreateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface

    constructor(repository: CustomerRepositoryInterface){
        this.customerRepository = repository
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto>{
        const customer = CustomerFactory.createWithAddress(
            input.name,
            new Address(input.address.street, input.address.number, input.address.zipCode, input.address.city)
        );

        customer.validate()

        await this.customerRepository.create(customer)

        return <OutputCreateCustomerDto>{
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                city: customer.Address.city,
                zipCode: customer.Address.zipCode
            }
        }
    }
}