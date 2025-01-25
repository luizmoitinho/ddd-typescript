import { EventDispatcher } from '../event/@shared/event.dispatcher';
import { CustomerChangeAddress } from '../event/customer/customer.changed.address.event';
import { CustomerCreatedEvent } from '../event/customer/customer.created.event';
import { EnviaConsoleLogHandler } from '../event/customer/handler/console.log.customer.changed.address';
import { EnviaConsoleLog1Handler } from '../event/customer/handler/console.log1.customer.created';
import { EnviaConsoleLog2Handler } from '../event/customer/handler/console.log2.customer.created';
import { Address } from './address';

export class Customer {
    private _id: string;
    private  _name: string;
    private _address!: Address;
    private _activate: boolean = false;
    private _rewardPoints: number = 0;

    private _dispatcher: EventDispatcher;
    private _eventChangeAddressHandler: EnviaConsoleLogHandler;
    private _eventEnviaConsoleLog1Handler: EnviaConsoleLog1Handler;
    private _eventEnviaConsoleLog2Handler: EnviaConsoleLog2Handler;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;

        this.validate()

        this._dispatcher = new EventDispatcher()
        this._eventChangeAddressHandler = new EnviaConsoleLogHandler();
        this._eventEnviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
        this._eventEnviaConsoleLog2Handler = new EnviaConsoleLog2Handler();

        this._dispatcher.register('CustomerChangeAddress', this._eventChangeAddressHandler);
        this._dispatcher.register('CustomerCreatedEvent', this._eventEnviaConsoleLog2Handler);
        this._dispatcher.register('CustomerCreatedEvent', this._eventEnviaConsoleLog1Handler);

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
        if(this._name.length === 0 ){
            throw new Error('name is required')
        }

        if(!this._id){
            throw new Error('id is required')
        }
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

    get changeAddressHandler(): EnviaConsoleLogHandler {
        return this._eventChangeAddressHandler;
    } 

    get consoleLog1Handler(): EnviaConsoleLog2Handler {
        return this._eventEnviaConsoleLog1Handler;
    } 

    get consoleLog2Handler(): EnviaConsoleLog2Handler {
        return this._eventEnviaConsoleLog2Handler;
    }

    set Address(address: Address){
        this._address =  address;
    }

    get Address(){
        return this._address
    }
}