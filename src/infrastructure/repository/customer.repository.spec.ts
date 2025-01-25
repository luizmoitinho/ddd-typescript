import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../database/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import { Address } from "../../domain/customer/value-object/address";
import { Customer } from "../../domain/customer/entity/customer";

describe('Customer respository test', () => {
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

    it('should create a customer', async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address('Street 1', 1, 'zip-code-1', 'City 1')
        const customer =  new Customer('123', "Customer 1");
        customer.Address = address

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: '123'}})
        expect(customerModel.toJSON()).toStrictEqual({
            id: '123',
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipCode: address.zipCode,
            city: address.city
        });
    });

    it('should update a customer', async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address('Street 1', 1, 'zip-code-1', 'City 1')
        const customer =  new Customer('123', "Customer 1");
        customer.Address = address

        await customerRepository.create(customer);

       customer.changeName("Customer 2");
       await customerRepository.update(customer);

        const updatedCustomerModel = await CustomerModel.findOne({ where: { id: '123'}})
        expect(updatedCustomerModel.toJSON()).toStrictEqual({
            id: '123',
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipCode: address.zipCode,
            city: address.city
        });
    });

    it('should find a customer', async() => {
        const customerRepository = new CustomerRepository();
        const address = new Address('Street 1', 1, 'zip-code-1', 'City 1')
        const customer =  new Customer('123', "Customer 1");
        customer.Address = address

        await customerRepository.create(customer);

        const foundCostumer =  await customerRepository.find(customer.id);

        expect(customer).toEqual(foundCostumer)
    })

    it('should throw an error when customer is not found', async() => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find('user-not-found')
        }).rejects.toThrow('customer not found')
    })

    it('should find all products', async() => {
        const customerRepository = new CustomerRepository();
        const address = new Address('Street 1', 1, 'zip-code-1', 'City 1')
        const customer =  new Customer('123', "Customer 1");
        customer.Address = address

        const addressTwo = new Address('Street 2', 2, 'zip-code-2', 'City 12')
        const customerTwo =  new Customer('124', "Customer 1");
        customerTwo.Address = address

        await customerRepository.create(customer);
        await customerRepository.create(customerTwo);

        const customers =  await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer)
        expect(customers).toContainEqual(customerTwo)
    })
});