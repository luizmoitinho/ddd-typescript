import express, { Express} from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer/repository/sequilize/customer.model';
import { customerRoute } from './routes/customer.route';
import ProductModel from '../product/repository/sequilize/product.model';
import { productRoute } from './routes/product.route';

export let sequelize: Sequelize;
export const app: Express = express();

app.use(express.json());
app.use('/customer', customerRoute)
app.use('/product', productRoute)

async function setupDB(){
    sequelize = new Sequelize(
        {
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
        }
    )
    sequelize.addModels([CustomerModel, ProductModel]);
    await sequelize.sync()
}

setupDB()