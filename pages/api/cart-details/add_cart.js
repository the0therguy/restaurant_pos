import {v4 as uuidv4} from 'uuid';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {productUUID, quantity, restaurant, tableNumber, discount} = req.body

        const product = await prisma.product.findUnique({
            where: {
                uuid: productUUID
            },
            select: {
                price: true
            }
        })
        const productPrice = product.price
        const discountCalculation = quantity * product.price * (discount / 100)
        try {
            const cartDetails = await prisma.cartDetails.create({
                data: {
                    uuid: uuidv4(),
                    productPrice: productPrice,
                    tableNumber: tableNumber,
                    quantity: quantity,
                    discountedPrice: discountCalculation,
                    price: (quantity * productPrice) - discountCalculation,
                    restaurant: restaurant,
                    product: {
                        connect: {
                            uuid: productUUID
                        }
                    }
                },
                select: {
                    uuid: true,
                    quantity: true,
                    price: true,
                    discountedPrice: true,
                    productPrice: true,
                    product: {
                        select: {
                            title: true
                        }
                    }
                }
            })
            res.status(200).json({message: "created", data: cartDetails})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: e})
        }
    } else {
        res?.status(500)?.json({message: "HTTP method not valid only POST accepted"})
    }
}