import { EventHandlerInterface } from "../../../@shared/event/event.handler.interface";
import { CustomerCreatedEvent } from "../customer.created.event";


export class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(eventData: CustomerCreatedEvent): void{
        console.log('Esse é o primeiro console.log do evento: CustomerCreated');
    }
}