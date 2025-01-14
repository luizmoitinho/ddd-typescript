import { Sequelize } from "sequelize-typescript";
import ProductModel from "../database/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe('Product respository test', () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize =  new Sequelize(
            {
                dialect: 'sqlite',
                storage: ':memory:',
                logging: false,
            }
        );
        sequelize.addModels([ProductModel])
        await sequelize.sync({ force: true})
    })

    afterEach( async() => {
        await sequelize.close()
    })

    it('should create a product', async () => {
        const productRepository = new ProductRepository();
        const product =  new Product('1', 'Product 1', 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: '1'}})
        expect(productModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'Product 1',
            price: 100
        })
    });

    it('should update a product', async () => {
        const productRepository = new ProductRepository();
        const product =  new Product('1', 'Product 1', 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: '1'}})
        expect(productModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'Product 1',
            price: 100
        })

       product.changeName("Product 2");
       product.changePrice(200);

       await productRepository.update(product);

       const productUpdated = await ProductModel.findOne({ where: { id: '1'}})
       expect(productUpdated.toJSON()).toStrictEqual({
           id: '1',
           name: 'Product 2',
           price: 200
       })
    });

    it('should find a product', async() => {
        const productRepository = new ProductRepository();
        const product =  new Product('1', 'Product 1', 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: '1'}})
        expect(productModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'Product 1',
            price: 100
        })        

        const foundProduct =  await productRepository.find('1');

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        })
    })

    it('should find all products', async() => {
        const productRepository = new ProductRepository()
        const productOne = new Product('1', 'Product 1', 100);
        const productTwo = new Product('2', 'Product 2', 100);

        await productRepository.create(productOne)
        await productRepository.create(productTwo);

        const foundProducts = await productRepository.findAll();
        const products = [productOne, productTwo];

        expect(products).toEqual(foundProducts)
    })
});