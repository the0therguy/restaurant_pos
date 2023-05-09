import {v4 as uuidv4} from 'uuid';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        if (!req.body) return res?.status(404)?.json({error: "Don't Have form data"})

        const {title, cost, price, restaurant} = req.body

        const checkExisting = await prisma.product.findUnique({
            where: {
                title: title
            }
        })
        if (checkExisting) return res?.status(442)?.json({message: "Product already Exists !!"})


        try {
            const product = await prisma.product.create({
                data: {
                    uuid: uuidv4(),
                    title: title,
                    cost: cost,
                    price: price,
                    restaurant: restaurant
                }
            })
            console.log(product)
            return res.status(201).json({message: 'product created!'})
        } catch (e) {
            if (e.code === 'P2002') {
                return res.status(400).json({
                    message: `There is a unique constraint violation, a new user cannot be created with this ${e.meta.target}`
                })
            }
            return res.status(400).json({message: 'something happened'})
        }

    } else {
        res?.status(500)?.json({message: "HTTP method not valid only POST accepted"})
    }
}