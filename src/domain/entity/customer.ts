import { Address } from './address';

export class Customer {
    private _id: string;
    private  _name: string;
    private _address!: Address;
    private _activate: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this.validate()
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
    }

    set Address(address: Address){
        this._address =  address;
    }

    get Address(){
        return this._address
    }
}