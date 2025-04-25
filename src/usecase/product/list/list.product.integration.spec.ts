import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import { ListProductUseCase } from "./list.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";
import Product from "../../../domain/product/entity/product";

describe('integration test to list product use case', () => {
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

    it('should return a product list', async () => {
        const productRepo = new ProductRepository()
        const useCase = new ListProductUseCase(productRepo)

        const productOne = new Product("uud-1", "Product 1", 20.25)
        const productTwo = new Product("uud-2", "Product 2", 15.25)

        await productRepo.create(productOne)
        await productRepo.create(productTwo)

        const input = <InputListProductDto>{}
        const want = <OutputListProductDto>{
            products: [
                {
                    id: "uud-1",
                    name: "Product 1",
                    price: 20.25
                },
                {
                    id: "uud-2",
                    name: "Product 2",
                    price: 15.25
                }
            ]
        }


        const got = await useCase.execute(input)

        expect(want).toEqual(got)
    })

    it('should handle an not found products', async () => {
        const productRepo = new ProductRepository()
        const useCase = new ListProductUseCase(productRepo)

        const input = <InputListProductDto>{}

        expect(
            async () => {
                await useCase.execute(input)
            }
        ).rejects.toThrow("products not found")
    })

})