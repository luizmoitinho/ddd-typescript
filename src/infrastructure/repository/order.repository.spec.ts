import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../database/sequelize/model/customer.model";
import Product from "../../domain/product/entity/product";
import OrderItemModel from "../database/sequelize/model/order_item.model";
import ProductModel from "../database/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import ProductRepository from "./product.repository";
import OrderItem from "../../domain/checkout/entity/order_item";
import Order from "../../domain/checkout/entity/order";
import OrderModel from "../database/sequelize/model/order.model";
import OrderRepository from "./order.repository";
import { Customer } from "../../domain/customer/entity/customer";
import { Address } from "../../domain/customer/value-object/address";

describe('Order respository test', () => {
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
        sequelize.addModels([CustomerModel, ProductModel, OrderItemModel, OrderModel])
        await sequelize.sync()
    })

    afterEach( async() => {
        await sequelize.close()
    })

    it('should create a new order', async() =>{
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository()

        const customer = new Customer("123", "John");
        const address = new Address('Street 1', 1, 'ZipCode 1', 'City 1');

        customer.changeAddress(address);
        await customerRepository.create(customer);

        const product = new Product('123', 'Product 1', 10);
        await productRepository.create(product)
        
        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2)
        const order = new Order('123', customer.id, [orderItem])
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include:[
                "items"
            ]
        })
        
        expect(orderModel.toJSON()).toStrictEqual({
            id: '123',
            customer_id: '123',
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: '123',
                    product_id: '123'
                }
            ]
        })
    })

    it('should throw error when trying create an invalid order', async () =>{
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository()

        const product = new Product('123', 'Product 1', 10);
        await productRepository.create(product)
        
        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2)
        const order = new Order('123', '1', [orderItem])
        
        await expect(
                orderRepository.create(order)
        ).rejects.toThrow('error creating a new order')
    })

    it('should update a existent order', async() =>{
        //arrange
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository()

        const customer = new Customer("123", "John");
        const address = new Address('Street 1', 1, 'ZipCode 1', 'City 1');

        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productOne = new Product('product-1', 'Product 1', 10);
        await productRepository.create(productOne)
        const firstItem = new OrderItem('item-1', productOne.name, productOne.price, productOne.id, 2)

        const order = new Order('123', customer.id, [firstItem])
        await orderRepository.create(order)

        //act
        const productTwo = new Product('product-2', 'Product 2', 20);
        await productRepository.create(productTwo)
        const secondItem = new OrderItem('item-2', productTwo.name, productTwo.price, productTwo.id, 3)

        order.changeItems([firstItem,secondItem])
        await orderRepository.update(order)

        //assert
        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include:[
                "items"
            ]
        })
 
        expect(orderModel.toJSON()).toStrictEqual({
            id: '123',
            customer_id: '123',
            total: order.total(),
            items: [
                {
                    id: firstItem.id,
                    name: firstItem.name,
                    price: firstItem.price,
                    quantity: firstItem.quantity,
                    order_id: '123',
                    product_id: 'product-1'
                },
                {
                    id: secondItem.id,
                    name: secondItem.name,
                    price: secondItem.price,
                    quantity: secondItem.quantity,
                    order_id: '123',
                    product_id: 'product-2'
                }
            ]
        })
    })

    it('should throw error when trying update an inexistent order', async () =>{
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository()

        const product = new Product('123', 'Product 1', 10);
        await productRepository.create(product)
        
        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2)
        const order = new Order('123', '1', [orderItem])
        
        await expect(
                orderRepository.update(order)
        ).rejects.toThrow('error when trying to update order')
    })

    it('should get order by id', async() => {
        //arrange
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository()

        const customer = new Customer("123", "John");
        const address = new Address('Street 1', 1, 'ZipCode 1', 'City 1');

        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productOne = new Product('product-1', 'Product 1', 10);
        await productRepository.create(productOne)
        const firstItem = new OrderItem('item-1', productOne.name, productOne.price, productOne.id, 2)
        const secondItem = new OrderItem('item-2', productOne.name, productOne.price, productOne.id, 3)

        const order = new Order('123', customer.id, [firstItem, secondItem])
        await orderRepository.create(order)

        //act
        const got = await orderRepository.find('123')

        //assert
        expect(got).toEqual(order)
    })

    it('should throw error when order not found', async() => {
        //arrange
        const orderRepository = new OrderRepository()

        //assert
        await expect(
            orderRepository.find('123')
        ).rejects.toThrow('order not found')
    })

    it('should get all orders', async() => {
        //arrange
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository()

        const customer = new Customer("123", "John");
        customer.changeAddress(new Address('Street 1', 1, 'ZipCode 1', 'City 1'));
        await customerRepository.create(customer);

        const customer2 = new Customer("1234", "Apache");
        customer2.changeAddress(new Address('Street 2', 2, 'ZipCode 2', 'City 2'));
        await customerRepository.create(customer2);

        const productOne = new Product('product-1', 'Product 1', 10);
        await productRepository.create(productOne)
        const firstItem = new OrderItem('item-1', productOne.name, productOne.price, productOne.id, 2)
        const secondItem = new OrderItem('item-2', productOne.name, productOne.price, productOne.id, 3)

        const order = new Order('123', customer.id, [firstItem])
        await orderRepository.create(order)

        const order2 = new Order('124', customer2.id, [secondItem])
        await orderRepository.create(order2)

        //act
        const got = await orderRepository.findAll()

        //assert
        expect(got).toEqual([order, order2])
    })

    it('should throw error when there are not orders', async() => {
        //arrange
        const orderRepository = new OrderRepository()

        //assert
        await expect(
            orderRepository.findAll() 
        ).rejects.toThrow('orders not found')
    })
});