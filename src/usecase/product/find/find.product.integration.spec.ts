import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

describe('integration test to find product usecase', () => {
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


    it('should return a specific product', async () => {
        const productRepo = new ProductRepository()
        const useCase = new FindProductUseCase(productRepo)

        const product = new Product("some-uuid", "Product A", 122.52)
        await productRepo.create(product)

        const input = <InputFindProductDto>{
            id: "some-uuid"
        }

        const expected = <OutputFindProductDto>{
            id: "some-uuid",
            name: "Product A",
            price: 122.52,
        }

        const got = await useCase.execute(input)
        expect(expected).toEqual(got)
    })

    it('should throw an error when the product is not found', async () => {
        const productRepo = new ProductRepository()
        const useCase = new FindProductUseCase(productRepo)

        const input = <InputFindProductDto>{
            id: "some-uuid"
        }
        
        expect(
            async () => {
                await useCase.execute(input)
            }
        ).rejects.toThrow("product not found")
    })
})