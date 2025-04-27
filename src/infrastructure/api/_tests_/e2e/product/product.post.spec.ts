import { InputCreateProductDto } from "../../../../../usecase/product/create/create.product.dto";
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
        const input = <InputCreateProductDto>{
            name: "Product 1",
            price: 112.55
        }

        const response = await request(app)
            .post('/product')
            .send(input)

        expect(response.status).toBe(201)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe("Product 1")
        expect(response.body.price).toBe(112.55)
    })

    it('should return an unprocessable entity error', async()=>{
        const input = <InputCreateProductDto>{}

        const response = await request(app)
            .post('/product')
            .send(input)

        expect(response.status).toBe(422)
        expect(response.body).toEqual(
            {message: "name and price are required to save a new product"}
        )
    })

    it('should return internal server error when name is invalid', async()=>{
        const input = <InputCreateProductDto>{
            name: "",
            price: 10
        }

        const response = await request(app)
            .post('/product')
            .send(input)

        expect(response.status).toBe(500)
        expect(response.body).toEqual(
            {message: "Error: name is required"}
        )
    })

    it('should return internal server error when price is invalid', async()=>{
        const input = <InputCreateProductDto>{
            name: "Product",
            price: 0
        }

        const response = await request(app)
            .post('/product')
            .send(input)

        expect(response.status).toBe(500)
        expect(response.body).toEqual(
            {message: "Error: price must be greater than 0"}
        )
    })
})