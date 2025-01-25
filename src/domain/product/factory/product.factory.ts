import Product from "../entity/product";
import ProductB from "../entity/product-b";
import { ProductInterface } from "../entity/product.interface";
import { v4 as uuid} from 'uuid';

export class ProductFactory {
    public static create(_type: new (...args: any[]) => ProductInterface, name: string, price:number): ProductInterface{
        switch (_type) {
            case Product:
                return new Product(uuid(), name, price)            
            case ProductB:
                return new ProductB(uuid(), name, price)
            default:
                throw new Error('product type not supported')
        }
    }
}