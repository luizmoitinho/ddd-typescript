import express, {Request, Response} from 'express'
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequilize/customer.repository';
import { InputCreateCustomerDto } from '../../../usecase/customer/create/create.customer.dto';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) =>{
    const useCase = new CreateCustomerUseCase(new CustomerRepository())

    try {
        const input = <InputCreateCustomerDto>{
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                zipCode: req.body.address.zipCode,
                number: req.body.address.number,
            }
        }

        const output = await useCase.execute(input)
        res.send(output)
    } catch (error) {
        res.sendStatus(500).send(error)
    }
});