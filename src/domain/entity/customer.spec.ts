import { Address } from "./address"
import { Customer } from "./customer"

describe('Customer unit tests', () => {
    it('should throw error when name is empty', () =>{
        expect(
            () => {
                new Customer("123", "")
            }
        ).toThrow("name is required")
    })

    it('should change name', () =>{
        //arrange
        let customer = new Customer("123", "John");

        //act
        customer.changeName("Jane");

        //assert
        expect(customer.name).toEqual("Jane")
    })

    it('should activate customer', () =>{
        //arrange
        let customer = new Customer("123", "John");
        const address = new Address("Rua X", 190, "49000-000", "Aracaju") 

        //act
        customer.Address = address;
        customer.activate()

        //assert
        expect(customer.isActive()).toBe(true)
    })

    it('should handler exception when there isnt customer address', () =>{
        let customer = new Customer("123", "John");
        expect(() => {
            customer.activate()
        }).toThrow("address is required to customer activation")
    })

    it('should deactivate customer', () =>{
        //arrange
        let customer = new Customer("123", "John");

        //act
        customer.deactivate()

        //assert
        expect(customer.isActive()).toBe(false)
    })


    it('should throw error when id is empty', () =>{
        expect(
            () => {
                new Customer("", "Name")
            }
        ).toThrow("id is required")
    })
})