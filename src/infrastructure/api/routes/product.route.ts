import express, {Request, Response} from 'express'
import ProductRepository from '../../product/repository/sequilize/product.repository'
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase'
import { InputCreateProductDto } from '../../../usecase/product/create/create.product.dto'
import { InputListProductDto } from '../../../usecase/product/list/list.product.dto'
import { ListProductUseCase } from '../../../usecase/product/list/list.product.usecase'
import NotificationError from '../../../domain/@shared/notification/notification.error'

export const productRoute = express.Router()

const createProductUseCase = new CreateProductUseCase(new ProductRepository())
const listProductUseCase = new ListProductUseCase(new ProductRepository())


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

        const output = await createProductUseCase.execute(input)
        res.status(201).send(output)
    } catch (error) {
        if( error instanceof NotificationError){
            res.status(422).json({message: error.message})
            return
        }
        res.status(500).json({message: `${error}`})
    }
})


productRoute.get('/', async(req: Request, res: Response)=>{
    try {
        const input = <InputListProductDto>{ }

        const output = await listProductUseCase.execute(input)
        res.status(200).send(output)
    } catch (error) {
        if (error instanceof Error) {
            if(error.message === 'products not found'){
                res.status(404).json({message: `${error}`})
                return
            }
        }
        res.status(500).json({message: `${error}`})
    }
})