import Product from "./product"

describe('Product unit tests',  () => {
    it('should throw error when id is empty', () =>{
        expect(
            () => {
                const product = new Product('', 'Product 1', 100)
            }
        ).toThrow('id is required')
    })

    it('should throw error when name is empty', () =>{
        expect(
            () => {
                const product = new Product('1', '', 100)
            }
        ).toThrow('name is required')
    })

    it('should throw error when price less than 0', () =>{
        expect(
            () => {
                const product = new Product('1', 'Product', -9)
            }
        ).toThrow('price must be greater than 0')
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