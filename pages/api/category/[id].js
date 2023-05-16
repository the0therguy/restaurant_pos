import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const category = await prisma.category.findUnique({
            where: {
                uuid: req.query.id
            },
            select:
                {
                    uuid: true,
                    title: true
                }
        })
        res.status(200).json({category: category})
    } else if (req.method === 'PUT') {
        const {title} = req.body
        const checkExisting = await prisma.category.findMany({
            where: {
                title: {
                    equals: title,
                    mode: 'insensitive'
                },
            },
            select: {
                uuid: true,
                title: true
            }
        })
        if (checkExisting) return res.status(400).json({message: "Already exist a category by this name"})
        const category = await prisma.category.update({
            data: req.body,
            where: {
                uuid: req.query.id
            },
            select: {
                uuid: true,
                title: true
            }
        })
        res.status(200).json({message: "category edited", category: category})
    } else if (req.method === 'DELETE') {
        const category = await prisma.category.findUnique({
            where: {
                uuid: req.query.id,
            }
        })
        if (category.isDeleted) {
            return res.status(204).json({message: 'No data found'})
        }
        await prisma.category.update({
            data: {
                isDeleted: true
            },
            where: {
                uuid: req.query.id
            },
        })
        return res.status(200).json({message: 'category deleted'})

    } else {
        res?.status(500)?.json({message: "HTTP method not valid only GET accepted"})
    }
}