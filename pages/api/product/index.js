import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const products = await prisma.product.findMany({
            where: {
                isDeleted: false
            },
            select: {
                uuid: true,
                title: true,
                price: true,
                restaurant: true,
                category: {
                    select: {
                        title: true
                    }
                }
            }
        })
        res.status(200).json({data: products})
    } else {
        res?.status(500)?.json({message: "HTTP method not valid only GET accepted"})

    }
}