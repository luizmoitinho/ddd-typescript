import { InputCreateProductDto } from "../../../../../usecase/product/create/create.product.dto";
import { OutputListProductDto, OutputProductDto } from "../../../../../usecase/product/list/list.product.dto";
import { app, sequelize } from "../../../express";
import  request  from "supertest";

describe('e2e test to post product', () => {
    beforeEach(async () => {
        await sequelize.sync(
            {
                force: true
            }
        )
    });

    afterAll(async () => {
        await sequelize.close()
    })

    it('should save a new product', async()=>{
        const products: InputCreateProductDto[] = [
            { name: "Product 1", price: 112.55},
            { name: "Product 2", price: 66.21},
        ]

        const allRequests = products.map( product => {
            return request(app).post('/product').send(product)
        });

        await Promise.all(allRequests)
        
        const want:  OutputListProductDto = {
            products: [
                { id: expect.any(String), name: "Product 1",price: 112.55,},
                { id:  expect.any(String),name: "Product 2",price: 66.21},
            ]
        }

        const productsReceived = await request(app).get('/product').send()

        expect(productsReceived.body).toMatchObject(want);
    })

    it('should return 404 error products is not found', async()=>{
        const got = await request(app).get('/product').send()


        expect(got.status).toBe(404)
        expect(got.body).toEqual(
            {message: "Error: products not found"}
        )
    })
})