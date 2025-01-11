import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface";
import CustomerModel from "../database/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface{

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
            street: entity.Address.street,
            number: entity.Address.number,
            zipCode: entity.Address.zipCode,
            city: entity.Address.city
        })
    }
    
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                id: entity.id,
                name: entity.name,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints,
                street: entity.Address.street,
                number: entity.Address.number,
                zipCode: entity.Address.zipCode
            },
            {
                where: {
                    id: entity.id,
                }
            }
        )
    }

    async find(id: string): Promise<Customer> {
        let model;
        try {
            model =  await CustomerModel.findOne(
                {
                    where: {
                        id: id,
                    }
                }
            )
        } catch (error) {
            throw new Error('customer not found')
        }

        const customer = new Customer(
            model.id,
            model.name,
        )

        customer.Address = new Address(
            model.street,
            model.number,
            model.zipCode,
            model.city
        )

        return customer
    }

    async findAll(): Promise<Customer[]> {
        const models = await CustomerModel.findAll()
        return models.map(model =>
            {
                const customer = new Customer(
                    model.id,
                    model.name,
                )
        
                customer.Address = new Address(
                    model.street,
                    model.number,
                    model.zipCode,
                    model.city
                )
                return customer
            }
        )
    }   
}