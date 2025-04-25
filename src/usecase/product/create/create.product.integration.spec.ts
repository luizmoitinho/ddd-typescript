import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import { CreateProductUseCase } from "./create.product.usecase";


describe('integration test to create product usecase', ()=>{
    let sequelize: Sequelize

    beforeEach(async ()=>{
        sequelize = new Sequelize(
           {
                dialect: 'sqlite',
                storage: ':memory:',
                logging: false,
                sync: { force: true}
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


    it('should create product', async ()=>{
        const productRepo = new ProductRepository()
        const useCase = new CreateProductUseCase(productRepo)

        const inputProductDto = {
            name: "Product A",
            price: 20.51
        }

        const expected = {
            id: expect.any(String),
            name: "Product A",
            price: 20.51
        }

        const got = await useCase.execute(inputProductDto)

        expect(got).toEqual(expected)
    });

    it("should handle an error when the price is invalid", async ()=>{
        const productRepo = new ProductRepository()
        const productCreateUseCase = new CreateProductUseCase(productRepo);

        const invalidInput = {
            name: "Product A",
            price: 0.0
        }

        expect(async()=>{
           await productCreateUseCase.execute(invalidInput)
        }).rejects.toThrow("price must be greater than 0")
    })

    it("should handle an error when the name is invalid", async ()=>{
        const productRepo = new ProductRepository()
        const productCreateUseCase = new CreateProductUseCase(productRepo);

        const invalidInput = {
            name: "",
            price: 20.0
        }

        expect(async()=>{
           await productCreateUseCase.execute(invalidInput)
        }).rejects.toThrow("name is required")
    })
})