import express, {Request, Response} from 'express'
import ProductRepository from '../../product/repository/sequilize/product.repository'
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase'
import { InputCreateProductDto } from '../../../usecase/product/create/create.product.dto'

export const productRoute = express.Router()

const useCase = new CreateProductUseCase(new ProductRepository())

productRoute.post('/', async(req: Request, res: Response)=>{
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('price')){
        res.status(422).json({message:'name and price are required to save a new product'})
        return
    }

    try {
        const input = <InputCreateProductDto>{
            name: req.body.name,
            price: req.body.price
        }

        const output = await useCase.execute(input)
        res.status(201).send(output)
    } catch (error) {
        res.status(500).json({message: `${error}`})
    }
})