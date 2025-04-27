import Product from "../product/entity/product";
import { ValidatorInterface } from "./validator.interface";
import * as yup from 'yup'

export class ProductYupValidator implements ValidatorInterface<Product>{
    validate(entity: Product): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().required('id is required'),
                    name: yup.string().required('name is required'),
                    price: yup.number().min(1, 'price must be greater than 0')
                })
                .validateSync(
                    {
                        id: entity.id,
                        name: entity.name,
                        price: entity.price
                    },
                    {
                        abortEarly: false,
                    }
                )
        } catch (errors) {
            const e = errors as yup.ValidationError
            e.errors.forEach( (err) => {
                entity.notification.addError({
                    context: entity.constructor.name,
                    message: err
                })
            })
        }
    }
}