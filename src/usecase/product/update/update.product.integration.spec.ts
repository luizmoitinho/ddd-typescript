import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import { UpdateProductUsecase } from "./update.product.usecase";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";
import Product from "../../../domain/product/entity/product";

describe('integration test for update product use case', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize(
            {
                dialect: 'sqlite',
                storage: ':memory:',
                logging: false,
                sync: { force: true }
            }
        )
        sequelize.addModels([ProductModel])
        await sequelize.sync()
    });

    afterEach(async () => {
        await ProductModel.destroy({ where: {}, truncate: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('shoud update a product', async () => {
        const productRepo = new ProductRepository()
        const useCase = new UpdateProductUsecase(productRepo)

        const product = new Product("uud-1", "Product 1", 20.25)
        await productRepo.create(product)

        const input = <InputUpdateProductDto>{
            id: "uuid-1",
            name: "Product 1 - Update",
            price: 55.66
        }

        const want = <OutputUpdateProductDto>{
            id: "uuid-1",
            name: "Product 1 - Update",
            price: 55.66
        }


        const got = await useCase.execute(input)

        expect(want).toEqual(got)
    })

    it('should throw an error when id is empty', async () => {
        const productRepo = new ProductRepository()
        const useCase = new UpdateProductUsecase(productRepo)

        const input = <InputUpdateProductDto>{
            id: "",
            name: "Product A",
            price: 12.22
        }

        expect(
            async () => {
                await useCase.execute(input)
            }
        ).rejects.toThrow("id is required")
    })

    it('should throw an error when the price is invalid', async () => {
        const productRepo = new ProductRepository()
        const useCase = new UpdateProductUsecase(productRepo)

        const input = <InputUpdateProductDto>{
            id: "some-uuid",
            name: "",
            price: 12.22
        }

        expect(
            async () => {
                await useCase.execute(input)
            }
        ).rejects.toThrow("name is required")
    })

    it('should throw an error when the name is invalid', async () => {
        const productRepo = new ProductRepository()
        const useCase = new UpdateProductUsecase(productRepo)
        
        const input = <InputUpdateProductDto>{
            id: "some-uuid",
            name: "Product A",
            price: -2
        }


        expect(
            async () => {
                await useCase.execute(input)
            }
        ).rejects.toThrow("Product: price must be greater than 0")
    })

})