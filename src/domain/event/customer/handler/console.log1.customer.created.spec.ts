import { EventDispatcher } from "../../@shared/event.dispatcher";
import { CustomerCreatedEvent } from "../customer.created.event";
import { EnviaConsoleLog1Handler } from "./console.log1.customer.created";

describe('EnviaConsoleLog1Handler', () => {
    it('should call console.log1 handler', () => {
        //arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();

        const spyEventHandler = jest.spyOn(eventHandler, 'handle')

        const customerCreateEvent = new CustomerCreatedEvent({})

        eventDispatcher.register('CustomerCreatedEvent', eventHandler);

        //act
        eventDispatcher.notify(customerCreateEvent)

        //arrange
        expect(spyEventHandler).toHaveBeenCalled();
    });
})