import Order from "../../domain/entity/order";
import OrderItemModel from "../database/sequelize/model/order_item.model";
import OrderModel from "../database/sequelize/model/order.model";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{model: OrderItemModel}]
            }
        )
    }

    async update(entity: Order): Promise<void> {
        const transaction = await OrderModel.sequelize?.transaction()
        if(!transaction){
            throw new Error('error during transaction creation')
        }

        try {
            await OrderModel.update(
                {
                    customer_id: entity.customerId,
                    total: entity.total(),
                },
                {
                    where: {
                        id: entity.id
                    },
                    transaction
                }
            )

            await OrderItemModel.destroy({
                where: { order_id: entity.id},
                transaction
            })

            const items = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                order_id: entity.id,
                product_id: item.productId,
            }))
            await OrderItemModel.bulkCreate(items, { transaction })

            await transaction.commit()

        } catch (error) {
            throw new Error(`error when trying to update order: ${error}`)
        }
    }

    find(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }
}