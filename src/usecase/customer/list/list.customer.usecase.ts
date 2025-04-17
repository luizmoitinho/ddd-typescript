import { Customer } from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { InputListCustomerDto, OuputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    readonly customerRepository: CustomerRepositoryInterface

    constructor(repo: CustomerRepositoryInterface){
        this.customerRepository = repo
    }

    async execute(input: InputListCustomerDto): Promise<OuputListCustomerDto>{
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers)
    }

}

class OutputMapper {
    static toOutput(customer: Customer[]):OuputListCustomerDto{
        return {
            customers: customer.map((customer)=>({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    city: customer.Address.city,
                    zipCode: customer.Address.zipCode,
                    number: customer.Address.number,
                }
            }))
        }
    }
}