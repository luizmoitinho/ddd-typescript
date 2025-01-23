import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send.email.product.create";
import { EventDispatcher } from "./event.dispatcher";

describe('Domain events tests', ()=>{
    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('product-created-event', eventHandler);

        expect(eventDispatcher.getEventHandlers['product-created-event']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['product-created-event'].length).toBe(1);
    })
})