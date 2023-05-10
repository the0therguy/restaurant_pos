import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const product = await prisma.product.findUnique({
            where: {
                uuid: req.query.id
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
            }
        })
        console.log(product)
        res.status(200).json({data: product})
    } else if (req.method==='DELETE') {
        try {
            await prisma.product.delete({
                where: {
                    uuid: req.query.id
                }
            })
            res.status(204)
        }
        catch (e) {
            res.status(400).json({message: "no content available"})
        }
    } else {
        res?.status(500)?.json({message: "HTTP POST method not valid"})
    }
}