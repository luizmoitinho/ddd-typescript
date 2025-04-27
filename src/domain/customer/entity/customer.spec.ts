import { CustomerChangeAddress } from "../event/customer.changed.address.event"
import { EnviaConsoleLogHandler } from "../event/handler/console.log.customer.changed.address"
import { EnviaConsoleLog1Handler } from "../event/handler/console.log1.customer.created"
import { EnviaConsoleLog2Handler } from "../event/handler/console.log2.customer.created"
import { Address } from "../value-object/address"
import { Customer } from "./customer"

describe('Customer unit tests', () => {
    it('should throw error when name is empty', () =>{
        expect(
            () => {
                new Customer("123", "")
            }
        ).toThrow("Customer: name is required")
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
        ).toThrow("Customer: id is required")
    })

    it('should throw error when id and name are empty', () =>{
        expect(
            () => {
                new Customer("", "")
            }
        ).toThrow("Customer: name is required,Customer: id is required")
    })

    it('should change address and handle an event', () =>{
        //arrange
        let customer = new Customer("123", "John");
        const spyEventHandler = jest.spyOn(EnviaConsoleLogHandler.prototype, 'handle');
        
        const want = new CustomerChangeAddress({
            id:'123',
            nome:'John',
            endereco: new Address('Street 1', 1, 'ZipCode 1', 'City 1')
        })

        //act
        const address = new Address('Street 1', 1, 'ZipCode 1', 'City 1');
        customer.changeAddress(address);

        //assert
    
        expect(spyEventHandler).toHaveBeenCalledWith(want)
    })

    it('should  handle two events when new Customer is created', () =>{
        //arrange
        const spyEventHandler1 = jest.spyOn(EnviaConsoleLog1Handler.prototype, 'handle');      
        const spyEventHandler2 = jest.spyOn(EnviaConsoleLog2Handler.prototype, 'handle');      

        //act
        let customer = new Customer("123", "John");

        //assert
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled()
    })
})