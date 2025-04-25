import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputListProductDto, OutputListProductDto, OutputProductDto } from "./list.product.dto";

export class ListProductUseCase {
    readonly productRepository: ProductRepositoryInterface

    constructor(repository: ProductRepositoryInterface){
        this.productRepository = repository
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto>{
        const productList = await this.productRepository.findAll()

        if(!productList || productList.length === 0){
            throw new Error('products not found')
        }

        const producsOutput = productList.map(p => (
            <OutputProductDto>{
                id: p.id,
                name: p.name,
                price: p.price
            }
        ));

        return <OutputListProductDto>{
            products: producsOutput
        }
    }
}