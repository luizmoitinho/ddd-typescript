import Product from "../../../domain/product/entity/product"
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto"
import { FindProductUseCase } from "./find.product.usecase"

describe('find product unit test',  ()=>{

    const productMockRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn()
        }
    }

    it('should return a specific product', async () => {
        const mockRepository = productMockRepository()
        const useCase = new FindProductUseCase(mockRepository)
        const input = <InputFindProductDto>{
            id: "some-uuid"
        }

        const expected = <Product>{
            id: "some-uuid",
            name: "Product A",
            price: 22.55,
        }

        const spy = jest.spyOn(mockRepository, 'find').mockResolvedValue(
            <OutputFindProductDto>{
                id: "some-uuid",
                name: "Product A",
                price: 22.55,
            }
        )

        const got = await useCase.execute(input)

        expect(spy).toHaveBeenCalledWith("some-uuid")
        expect(expected).toEqual(got)
    })

    it('should throw an error when the product is not found', async () => {
        const mockRepository = productMockRepository()
        const useCase = new FindProductUseCase(mockRepository)
        const input = <InputFindProductDto>{
            id: "some-uuid"
        }

        const spy = jest.spyOn(mockRepository, 'find').mockResolvedValue(null)

        expect(
            async () => {
                await useCase.execute(input)
            }
        ).rejects.toThrow("product not found")
    })
})