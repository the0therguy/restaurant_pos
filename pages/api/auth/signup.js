import {hash} from "bcrypt";
import {v4 as uuidv4} from 'uuid';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        if (!req.body) return res?.status(404)?.json({error: "Don't Have form data"})

        const {username, email, password} = req.body

        const checkExisting = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        if (checkExisting) return res?.status(442)?.json({message: "JSON User already Exists !!"})
        try {
            const user = await prisma.user.create({
                data: {
                    uuid: uuidv4(),
                    username: username,
                    email: email,
                    password: await hash(password, 12)
                }
            })
            console.log(user)
            return res.status(201).json({message: 'user created!'})
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