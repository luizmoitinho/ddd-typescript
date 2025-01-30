import { Customer } from "../../customer/entity/customer";
import Product from "../entity/product";
import ProductB from "../entity/product-b";
import { ProductFactory } from "./product.factory";

describe('Product factory unit test', () => {
    it('should create a product type a', () => {
        const product = ProductFactory.create(Product, "Product A", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toBe('Product A');
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe('Product')
    });

    it('should create a product type b', () => {
        const product = ProductFactory.create(ProductB, "Product B", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toBe('Product B');
        expect(product.price).toBe(2);
        expect(product.constructor.name).toBe('ProductB')
    });

    it('should throw an error when there is a not supported product', () => {
        expect(()=>{
            ProductFactory.create(undefined, "Null B", 1);
        }).toThrow('product type not supported');
    });
});