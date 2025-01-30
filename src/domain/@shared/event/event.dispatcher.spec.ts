import { SendEmailWhenProductIsCreatedHandler } from "../../product/events/handler/send.email.product.create";
import { ProductCreatedEvent } from "../../product/events/product.created.event";
import { EventDispatcher } from "./event.dispatcher";

describe('Domain events tests', ()=>{
    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
    })

    it('should unregister an event handler', () => {
        //arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        //act
        eventDispatcher.unregister('ProductCreatedEvent', eventHandler)

        //arrange
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);
    })

    it('should unregisterAll events handler', () => {
        //arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        //act
        eventDispatcher.unregisterAll()

        //arrange
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();
    })

    it('should notify events', () => {
        //arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        const spyEventHandler = jest.spyOn(eventHandler, 'handle')

        const productCreateEvent = new ProductCreatedEvent({
            name: 'Product 1',
            description: 'Producit 1 description',
            price: 110.20,
            customer: {
                email: 'luiz_moitinho@gmail.com'
            }

        })


        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        //act
        eventDispatcher.notify(productCreateEvent)

        //arrange
        expect(spyEventHandler).toHaveBeenCalled();
    })
})