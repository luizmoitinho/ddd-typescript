import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../database/sequelize/model/customer.model";
import Product from "../../domain/entity/product";
import { Customer } from "../../domain/entity/customer";
import { Address } from "../../domain/entity/address";
import OrderItemModel from "../database/sequelize/model/order_item.model";
import ProductModel from "../database/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import ProductRepository from "./product.repository";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderModel from "../database/sequelize/model/order.model";
import OrderRepository from "./order.repository";

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
});