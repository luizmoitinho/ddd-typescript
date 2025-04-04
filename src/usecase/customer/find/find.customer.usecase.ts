import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export class FindCustomerUseCase {
    private readonly customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface){
        this.customerRepository = customerRepository
    }

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto>{
        const customer = await this.customerRepository.find(input.id);

        if(customer){
            return <OutputFindCustomerDto>{
                id: customer.id,
                name: customer.name,
                address: {
                    city: customer.Address.city,
                    street: customer.Address.street,
                    zipCode: customer.Address.zipCode,
                    number: customer.Address.number,
                }
            }
        }
        return;
    }
}