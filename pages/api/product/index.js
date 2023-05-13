import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const products = await prisma.product.findMany()
        res.status(200).json({data: products})
    } else {
        res?.status(500)?.json({message: "HTTP method not valid only GET accepted"})

    }
}