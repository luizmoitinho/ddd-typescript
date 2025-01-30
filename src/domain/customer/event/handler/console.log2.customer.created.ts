import { EventHandlerInterface } from "../../../@shared/event/event.handler.interface";
import { CustomerCreatedEvent } from "../customer.created.event";

export class EnviaConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(eventData: CustomerCreatedEvent): void{
        console.log('Esse é o segundo console.log do evento: CustomerCreated');
    }
}