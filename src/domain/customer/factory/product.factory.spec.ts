import Product from "../../product/entity/product"
import { ProductFactory } from "./product.factory";

describe('ProductFactory', () => {

    it('should return product wiht uuid, name and price', () => {
        const expected = <Product>{
            name:"Product A", 
            price:10.25
        };

        const got = ProductFactory.create("Product A", 10.25)

        expect(got.id).toBeDefined()
        expect(expected.name).toBe(got.name)
        expect(expected.price).toBe(got.price)
    })
})