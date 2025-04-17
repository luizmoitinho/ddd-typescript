import { CreateProductUseCase } from "./create.product.usecase"

describe("unit test to create product with use case", ()=>{

    const productMockRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn()
        }
    }

    it("should create a new product", async ()=>{
        
        const productRepo = productMockRepository()
        const productCreateUseCase = new CreateProductUseCase(productRepo);

        const inputProductDto = {
            name: "Product A",
            price: 20.51
        }

        const expected = {
            id: expect.any(String),
            name: "Product A",
            price: 20.51
        }

        const got = await productCreateUseCase.execute(inputProductDto)

        expect(got).toEqual(expected)
    })

    it("should handle an error when the price is invalid", async ()=>{
        const productRepo = productMockRepository()
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
        const productRepo = productMockRepository()
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