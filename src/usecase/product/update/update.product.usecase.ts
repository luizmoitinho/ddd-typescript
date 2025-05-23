import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export class UpdateProductUsecase {
    readonly productRepository: ProductRepositoryInterface

    constructor(product: ProductRepositoryInterface){
        this.productRepository = product
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto>{
        const product = new Product(input.id, input.name, input.price)
        product.validate()
        
        this.productRepository.update(product)

        return <OutputUpdateProductDto>{
            id: product.id,
            name: product.name,
            price: product.price
        }
    }    
}