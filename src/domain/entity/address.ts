export class Address {
    _street: string = '';
    _number: number = 0;
    _zipCode: string = '';
    _city: string = '';

    constructor(street: string, number: number, zipCode: string, city:string){
        this._street = street;
        this._number = number;
        this._zipCode = zipCode;
        this._city = city;

        this.validate();
    }

    validate() {
        if(this._street.length === 0){
            throw new Error("street is required")
        }

        if(this._number === 0){
            throw new Error("number is required")
        }

        if(this._zipCode.length === 0){
            throw new Error("zip code is required")
        }

        if(this._city.length === 0){
            throw new Error("city is required")
        }
    }

    toString(): string{
        return `${this._street}, ${this._city}, ${this._number} - ${this._zipCode}`
    }
}