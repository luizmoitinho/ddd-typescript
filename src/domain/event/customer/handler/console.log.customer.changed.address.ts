import { EventHandlerInterface } from "../../@shared/event.handler.interface";
import { CustomerCreatedEvent } from "../customer.created.event";

export class EnviaConsoleLogHandler implements EventHandlerInterface {
    handle(data: CustomerCreatedEvent){
        console.log(`Endereço do cliente: ${data?.eventData?.id}, ${data?.eventData?.nome} alterado para: ${data?.eventData?.endereco}`);
    }
}