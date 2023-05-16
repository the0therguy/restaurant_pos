import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const categories = await prisma.category.findMany({
            where: {
                isDeleted: false
            },
            select:
                {
                    uuid: true,
                    title: true
                }
        })
        res.status(200).json({categories: categories})
    } else {
        res?.status(500)?.json({message: "HTTP method not valid only GET accepted"})
    }
}