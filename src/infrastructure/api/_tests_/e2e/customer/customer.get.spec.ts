import {app, sequelize} from '../../../express'
import request from 'supertest'

describe('E2E get test for customer', () =>{
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

    it('should list all customers', async()=>{
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
        const responseTwo = await request(app)
            .post('/customer')
            .send(
                {
                    name: "Jane",
                    address: {
                        street: "Street 1",
                        city: "City 1",
                        zipCode: "1234-123",
                        number: 123
                    }
                }
        )
        
        expect(response.status).toBe(200)
        expect(responseTwo.status).toBe(200)

        const listRespose = await request(app)
            .get("/customer")
            .send()

        expect(listRespose.status).toBe(200)
        expect(listRespose.body.customers.length).toBe(2)

        expect(listRespose.body.customers[0].name).toBe('John')
        expect(listRespose.body.customers[0].address.street).toBe('Street')

        expect(listRespose.body.customers[1].name).toBe('Jane')
        expect(listRespose.body.customers[1].address.street).toBe('Street 1')

    })
    

    it('should list all customers - xml', async()=>{
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
        const responseTwo = await request(app)
            .post('/customer')
            .send(
                {
                    name: "Jane",
                    address: {
                        street: "Street 1",
                        city: "City 1",
                        zipCode: "1234-123",
                        number: 123
                    }
                }
        )
        
        expect(response.status).toBe(200)
        expect(responseTwo.status).toBe(200)

        const listRespose = await request(app)
            .get("/customer")
            .set('Accept', 'application/xml')
            .send()

        expect(listRespose.status).toBe(200)
        expect(listRespose.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listRespose.text).toContain(`<customers>`);
        expect(listRespose.text).toContain(`<customer>`);
        expect(listRespose.text).toContain(`<name>John</name>`);
        expect(listRespose.text).toContain(`<address>`);
        expect(listRespose.text).toContain(`<street>Street</street>`);
        expect(listRespose.text).toContain(`<city>City</city>`);
        expect(listRespose.text).toContain(`<number>123</number>`);
        expect(listRespose.text).toContain(`<zip>1234-123</zip>`);
        expect(listRespose.text).toContain(`</address>`);
        expect(listRespose.text).toContain(`</customer>`);
        expect(listRespose.text).toContain(`<name>Jane</name>`);
        expect(listRespose.text).toContain(`<street>Street 1</street>`);
        expect(listRespose.text).toContain(`</customers>`);

    })
})