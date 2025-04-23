import express, { Express} from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer/repository/sequilize/customer.model';

export let sequelize: Sequelize;
export const app: Express = express();

app.use(express.json());

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