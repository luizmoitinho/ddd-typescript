import express, { Express} from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer/repository/sequilize/customer.model';
import { customerRoute } from './routes/customer.route';

export let sequelize: Sequelize;
export const app: Express = express();

app.use(express.json());
app.use('/customer', customerRoute)

async function setupDB(){
    sequelize = new Sequelize(
        {
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
        }
    )
    sequelize.addModels([CustomerModel]);
    await sequelize.sync()
}

setupDB()