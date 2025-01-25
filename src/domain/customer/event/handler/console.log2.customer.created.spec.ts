
import { EventDispatcher } from "../../../@shared/event/event.dispatcher";
import { CustomerCreatedEvent } from "../customer.created.event";
import { EnviaConsoleLog2Handler } from "./console.log2.customer.created";

describe('EnviaConsoleLog2Handler', () => {
    it('should call console.log2 handler', () => {
        //arrange
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog2Handler();

        const spyEventHandler = jest.spyOn(eventHandler, 'handle')

        const customerCreateEvent = new CustomerCreatedEvent({})

        eventDispatcher.register('CustomerCreatedEvent', eventHandler);

        //act
        eventDispatcher.notify(customerCreateEvent)

        //arrange
        expect(spyEventHandler).toHaveBeenCalled();
    });
})