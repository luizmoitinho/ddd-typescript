import Order from "./order"
import OrderItem from "./order_item"

describe('Order unit tests',  () => {
    it('should throw error when id is empty', () =>{
        expect(
            () => {
                new Order("", "123", [])
            }
        ).toThrow("id is required")
    })

    it('should throw error when customer id is empty', () =>{
        expect(
            () => {
                new Order("123", "", [])
            }
        ).toThrow("customer id is required")
    })

    it('should throw error when there is no items', () =>{
        expect(
            () => {
                new Order("123", "312", [])
            }
        ).toThrow("items quantity must be greater than 0")
    })

    it('should calculate total', () =>{
        //arrange
        let item1 = new OrderItem("1", "Item1", 100, 'p1', 2)
        let item2 = new OrderItem("2", "Item2", 200, 'p2', 2)
        const order = new Order("123", "312", [item1, item2])

        //act
        const got = order.total()

        //assert
        expect(got).toEqual(600)
    })

    it('should check the item quantity is greater than zero', () =>{
        let item1 = new OrderItem("1", "Item1", 100, 'p1', 0)
        let item2 = new OrderItem("2", "Item2", 200, 'p2', 2)

        expect(
            () => {
                const order = new Order("123", "312", [item1, item2])
            }
        ).toThrow("quantity must be greater than zero")
    })


    it('should check the item price is greater than zero', () =>{
        let item1 = new OrderItem("1", "Item1", -100, 'p1', 1)
        let item2 = new OrderItem("2", "Item2", 200, 'p2', 2)

        expect(
            () => {
                const order = new Order("123", "312", [item1, item2])
            }
        ).toThrow("price must be greater than zero")
    })
})