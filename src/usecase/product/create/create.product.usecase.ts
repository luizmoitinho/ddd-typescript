import { ProductFactory } from "../../../domain/customer/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export class CreateProductUseCase {
    readonly productRepository: ProductRepositoryInterface

    constructor(repository: ProductRepositoryInterface){
        this.productRepository = repository
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto>{
        const newProduct = ProductFactory.create(input.name, input.price)

        newProduct.validate()

        await this.productRepository.create(newProduct);

        return <OutputCreateProductDto>{
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price
        };
    }
}