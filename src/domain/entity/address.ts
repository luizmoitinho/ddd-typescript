export class Address {
   private _street: string = '';
   private _number: number = 0;
   private _zipCode: string = '';
   private _city: string = '';

    constructor(street: string, number: number, zipCode: string, city:string){
        this._street = street;
        this._number = number;
        this._zipCode = zipCode;
        this._city = city;

        this.validate();
    }

    get street(): string{
        return this._street
    }

    get number(): number{
        return this._number
    }

    get zipCode(): string{
        return this._zipCode
    }

    get city(): string{
        return this._city
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