import Entity from '../../@shared/entity/entity.abstract';
import { EventDispatcher } from '../../@shared/event/event.dispatcher';
import { Notification } from '../../@shared/notification/notification';
import NotificationError from '../../@shared/notification/notification.error';
import { CustomerChangeAddress } from '../event/customer.changed.address.event';
import { CustomerCreatedEvent } from '../event/customer.created.event';
import { EnviaConsoleLogHandler } from '../event/handler/console.log.customer.changed.address';
import { EnviaConsoleLog1Handler } from '../event/handler/console.log1.customer.created';
import { EnviaConsoleLog2Handler } from '../event/handler/console.log2.customer.created';
import CustomerValidatorFactory from '../factory/customer.validator.factory';
import { Address } from '../value-object/address';

export class Customer extends Entity {
    private  _name: string;
    private _address!: Address;
    private _activate: boolean = false;
    private _rewardPoints: number = 0;

    private _dispatcher: EventDispatcher = new EventDispatcher();
    private _changeAddressHandler: EnviaConsoleLogHandler = new EnviaConsoleLogHandler();
    private _firstHandler: EnviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
    private _secondHandler: EnviaConsoleLog2Handler = new EnviaConsoleLog2Handler();

    constructor(id: string, name: string){
        super()
        this._id = id;
        this._name = name;

        this.validate()

        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.errors)
        }

        this._dispatcher.register('CustomerChangeAddress', this._changeAddressHandler);
        this._dispatcher.register('CustomerCreatedEvent', this._firstHandler);
        this._dispatcher.register('CustomerCreatedEvent', this._secondHandler);

        this._dispatcher.notify(new CustomerCreatedEvent({}));
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get rewardPoints(): number{
        return this._rewardPoints
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points
    }

    validate(){
      CustomerValidatorFactory.create().validate(this)
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate(){
        if(!this._address){
            throw new Error('address is required to customer activation')
        }
        this._activate = true
    }

    isActive(): boolean {
        return this._activate
    }

    deactivate(){
        this._activate = false;
    }

    changeAddress (address: Address){
        this._address =  address;

        const event = new CustomerChangeAddress({
            id: this._id,
            nome: this._name,
            endereco: this._address
        });

        this._dispatcher.notify(event);
    }

    set Address(address: Address){
        this._address =  address;
    }

    get Address(){
        return this._address
    }
}