import Product from "../entity/product"
import ProductService from "./product.service"

describe("Product service unit tests", () => {
    it("should change the prices of all products", () => {
        //Arrange
        const productOne = new Product("id-1", "Product One", 10)
        const productTwo = new Product("id-2", "Product Two", 20)
        const products = [productOne, productTwo]

        //Act
        const got = ProductService.applyIncreaseByPercent(products, 100)
        
        //Assert
        expect(got[0].price).toBe(20)
        expect(got[1].price).toBe(40)
    })
})