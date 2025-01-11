import { Customer } from "../entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service"

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer =  new Customer("c1", "Customer 1")
        const ordemItem1 = new OrderItem("item-1", "Item 1", 10, "p1", 1)
      
        const order = OrderService.placeOrder(customer, [ordemItem1])

        expect(customer.rewardPoints).toBe(5)
        expect(order.total()).toBe(10)
    })

    it('should get total of all orders', () => {
        const ordemItem1 = new OrderItem("item-1", "Item 1", 100, "p1", 1)
        const ordemItem2 = new OrderItem("item-2", "Item 2", 200, "p2", 2)

        const order1 = new Order("order-1", "customer-1", [ordemItem1])
        const order2 = new Order("order-2", "customer-1", [ordemItem2])

        const total =  OrderService.total([order1, order2])

        expect(total).toBe(500)
    })

    it("should add rewar points", () => {
        const customer =  new Customer("c1", "Customer 1")
        expect(customer.rewardPoints).toBe(0)

        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10)

        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(20)

    })

})
