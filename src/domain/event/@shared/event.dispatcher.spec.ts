import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send.email.product.create";
import { EventDispatcher } from "./event.dispatcher";

describe('Domain events tests', ()=>{
    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('product-created-event', eventHandler);

        expect(eventDispatcher.getEventHandlers['product-created-event']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['product-created-event'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['product-created-event'][0]).toMatchObject(eventHandler)
    })

    it('should unregister an event handler', () => {
        //arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('product-created-event', eventHandler);

        //act
        eventDispatcher.unregister('product-created-event', eventHandler)

        //arrange
        expect(eventDispatcher.getEventHandlers['product-created-event']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['product-created-event'].length).toBe(0);
    })

    it('should unregisterAll events handler', () => {
        //arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('product-created-event', eventHandler);

        //act
        eventDispatcher.unregisterAll()

        //arrange
        expect(eventDispatcher.getEventHandlers['product-created-event']).toBeUndefined();
    })
})