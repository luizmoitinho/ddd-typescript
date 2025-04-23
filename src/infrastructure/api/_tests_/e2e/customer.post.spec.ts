import {app, sequelize} from '../../express'
import request from 'supertest'

describe('E2E post test for customer', () =>{
    beforeEach(async()=>{
        await sequelize.sync(
            {
                force: true
            }
        )
    })

    afterAll(async ()=>{
        await sequelize.close()
    })

    it('should create a customer', async()=>{
        const response = await request(app)
            .post('/customer')
            .send(
                {
                    name: "John",
                    address: {
                        street: "Street",
                        city: "City",
                        zipCode: "1234-123",
                        number: 123
                    }
                }
            )

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("John")
        expect(response.body.address.street).toBe("Street")
        expect(response.body.address.city).toBe("City")
        expect(response.body.address.zipCode).toBe("1234-123")
        expect(response.body.address.number).toBe(123)
    })

    it('should return an internal server error', async()=>{
        const response = await request(app)
            .post('/customer')
            .send(
                {
                }
            )

        expect(response.status).toBe(500)
        expect(response.body).toEqual({message: 'error when trying save a customer'})
    })
})