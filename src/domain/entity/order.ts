import OrderItem from "./order_item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._items =  items;
        this._total =  this.total();
        this.validate()
    }

    get items(): OrderItem[] {
        return this._items
    }

    get id(): string {
        return this._id
    }

    get customerId(): string{
        return this._customerId
    }

    changeItems(items: OrderItem[]){
        this._items = items
    }

    total(): number{
        return Number(
            (this._items.reduce((acc, item) => acc + item.total, 0)).toFixed(2)
        )
    }

    validate() {
        if(this._id.length === 0){
            throw new Error('id is required')
        }

        if(this._customerId.length === 0){
            throw new Error('customer id is required')
        }

        if(this._items.length === 0){
            throw new Error('items quantity must be greater than 0')
        }

        if(this._items.some(item => item.quantity <= 0)){
            throw new Error('quantity must be greater than zero')
        }
        
        if(this._items.some(item => item.price <= 0)){
            throw new Error('price must be greater than zero')
        }
    }
}