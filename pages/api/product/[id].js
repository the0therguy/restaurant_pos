import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const product = await prisma.product.findUnique({
            where: {
                uuid: req.query.id
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
        if (product) return res.status(200).json({data: product})
        else return res.status(400).json({message: "Product Not found"})
    } else if (req.method === 'PUT') {
        if (!req.body) return res?.status(404)?.json({error: "Don't Have form data"})
        const product = await prisma.product.update({
            data: req.body,
            where: {
                uuid: req.query.id
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
        res.status(200).json({data: product})
    } else if (req.method === 'DELETE') {
        const product = await prisma.product.findUnique({
            where: {
                uuid: req.query.id,
            }
        })
        if (product.isDeleted) {
            return res.status(204).json({message: 'No data found'})
        }
        await prisma.product.update({
            data: {
                isDeleted: true
            },
            where: {
                uuid: req.query.id
            },
        })
        return res.status(200).json({message: 'product deleted'})
    } else {
        res?.status(500)?.json({message: "HTTP POST method not valid"})
    }
}