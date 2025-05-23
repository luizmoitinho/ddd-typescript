import Product from "../entity/product"

describe('Product unit tests',  () => {
    it('should throw error when id is empty', () =>{
        expect(
            () => {
                const product = new Product('', 'Product 1', 100)
            }
        ).toThrow('Product: id is required')
    })

    it('should throw error when name is empty', () =>{
        expect(
            () => {
                const product = new Product('1', '', 100)
            }
        ).toThrow('Product: name is required')
    })

    it('should throw error when price less than 0', () =>{
        expect(
            () => {
                const product = new Product('1', 'Product', -9)
            }
        ).toThrow('Product: price must be greater than 0')
    })

    it('should throw error when id, name and price are invalid', () =>{
        expect(
            () => {
                const product = new Product('', '', -9)
            }
        ).toThrow('Product: id is required,Product: name is required,Product: price must be greater than 0')
    })

    it('should change name', () =>{
        const product = new Product('1', 'Product', 10)
        
        product.changeName("New Name") 

        expect(product.name).toEqual('New Name')
    })

    it('should change price', () =>{
        const product = new Product('1', 'Product', 10)
        
        product.changePrice(200) 
        
        expect(product.price).toEqual(200)
    })
})