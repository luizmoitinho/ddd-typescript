import Product from "../../../domain/product/entity/product"
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto"
import { UpdateProductUsecase } from "./update.product.usecase"

describe('update product use case', ()=>{
    const productMockRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn()
        }
    }

    it('shoud update a product', async()=>{
        const repository = productMockRepository()
        const input = <InputUpdateProductDto>{
            id: "some-uuid",
            name: "Product A",
            price: 12.22
        }

        const want = <OutputUpdateProductDto>{
            id: "some-uuid",
            name: "Product A",
            price: 12.22
        }
        

        const spy = jest.spyOn(repository, "update")

        const useCase = new UpdateProductUsecase(repository)

        const got = await useCase.execute(input)

        expect(want).toEqual(got)
        expect(spy).toHaveBeenCalledWith(new Product("some-uuid", "Product A", 12.22))
    })

    it('should throw an error when id is empty', async()=>{
        const repository = productMockRepository()
        const input = <InputUpdateProductDto>{
            id: "",
            name: "Product A",
            price: 12.22
        }

        const useCase = new UpdateProductUsecase(repository)

        expect(
            async()=>{
                await useCase.execute(input)
            }
        ).rejects.toThrow("id is required")
    })

    it('should throw an error when the price is invalid', async()=>{
        const repository = productMockRepository()
        const input = <InputUpdateProductDto>{
            id: "some-uuid",
            name: "",
            price: 12.22
        }

        const useCase = new UpdateProductUsecase(repository)

        expect(
            async()=>{
                await useCase.execute(input)
            }
        ).rejects.toThrow("name is required")
    })

    it('should throw an error when the name is invalid', async()=>{
        const repository = productMockRepository()
        const input = <InputUpdateProductDto>{
            id: "some-uuid",
            name: "Product A",
            price: -2
        }

        const useCase = new UpdateProductUsecase(repository)

        expect(
            async()=>{
                await useCase.execute(input)
            }
        ).rejects.toThrow("price must be greater than 0")
    })
})