
export interface OutputProductDto{
    id: string
    name: string
    price: number
}

export interface InputListProductDto {
}

export interface OutputListProductDto {
    products: OutputProductDto[];
}