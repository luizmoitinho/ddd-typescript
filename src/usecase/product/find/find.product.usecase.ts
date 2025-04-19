import { ProductFactory } from "../../../domain/customer/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export class FindProductUseCase{
    readonly productRepository: ProductRepositoryInterface

    constructor(product: ProductRepositoryInterface){
        this.productRepository = product
    }

    async execute(input: InputFindProductDto):Promise<OutputFindProductDto>{
        const product = await this.productRepository.find(input.id)

        if(!product){
            throw new Error('product not found')
        }

        return <OutputFindProductDto>{
            id: product.id,
            name: product.name,
            price: product.price,
        }
    }

}