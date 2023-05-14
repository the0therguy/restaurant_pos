import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {title} = req.body
        console.log(title)
        const product = await prisma.product.findMany({
            where: {
                title: {
                    search: '+'+title
                }
            }
        })
        res.status(200).json({data: product})
    } else {
        res?.status(500)?.json({message: "HTTP method not valid only POST accepted"})
    }
}