import { InputListProductDto, OutputListProductDto } from "./list.product.dto"
import { ListProductUseCase } from "./list.product.usecase"

describe('list product unit test', () => {
    const productMockRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn()
        }
    }

    it('should return a product list', async()=>{
        const repository = productMockRepository()
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

        const spy = jest.spyOn(repository, "findAll").mockResolvedValue(
            [
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
        )

        const useCase = new ListProductUseCase(repository)
        const got = await useCase.execute(input)

        expect(spy).toHaveBeenCalledWith()
        expect(want).toEqual(got)
    })

    it('should handle an not found products', async()=>{
        const repository = productMockRepository()
        const input = <InputListProductDto>{}

        const spy = jest.spyOn(repository, "findAll").mockResolvedValue(null)

        const useCase = new ListProductUseCase(repository)

        expect(
           async () => {
                await useCase.execute(input)
           }
        ).rejects.toThrow("products not found")
    })
})