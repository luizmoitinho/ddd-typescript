import { Customer } from "../customer/entity/customer";
import { ValidatorInterface } from "./validator.interface";
import * as yup from 'yup'

export class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().required('id is required'),
                    name: yup.string().required('name is required')
                })
                .validateSync(
                    {
                        id: entity.id,
                        name: entity.name
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