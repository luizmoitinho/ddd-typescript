import { ProductInterface } from "./product.interface"

export default class ProductB implements ProductInterface {
    private _id: string
    private _name: string
    private _price: number

    constructor(id: string, name: string, price: number){
        this._id = id
        this._name = name
        this._price = price
        this.validate()
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    changePrice(price: number) {
        this._price = price
        this.validate()
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price * 2
    }

    validate(){
        if(this._id.length === 0){
            throw new Error('id is required')
        }

        if(this._name.length === 0){
            throw new Error('name is required')
        }
        
        if(this._price <= 0){
            throw new Error('price must be greater than 0')
        }
    }
}