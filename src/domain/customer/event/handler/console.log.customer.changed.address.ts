import { EventHandlerInterface } from "../../../@shared/event/event.handler.interface";
import { CustomerChangeAddress } from "../customer.changed.address.event";

export class EnviaConsoleLogHandler implements EventHandlerInterface {
    handle(data: CustomerChangeAddress){
        console.log(`Endereço do cliente: ${data?.eventData?.id}, ${data?.eventData?.nome} alterado para: ${data?.eventData?.endereco}`);
    }
}