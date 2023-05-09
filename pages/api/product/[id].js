import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler (req, res) {
    if (req.method === 'GET') {
        const product = await prisma.product.findUnique({
            where: {
                uuid: req.query.id
            }
        })
        return res.status(200).json({data: product})

    } else {
        res?.status(500)?.json({message: "HTTP method not valid only POST accepted"})
    }
}