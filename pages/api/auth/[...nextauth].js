import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import {compare} from "bcrypt";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {

                // check user existance
                const result = await prisma.user.findUnique({
                    where: {
                        username: credentials.username
                    }
                })
                if (!result) {
                    throw new Error("No user found with this username please signup")
                }
                // //compare
                const checkPassword = await compare(credentials.password, result.password)
                if (!checkPassword || result.username !== credentials.username) {
                    throw new Error("Username and password doesn't match")
                }
                if (!checkPassword || credentials.username !== result.username)
                    throw new Error("Username and password doesn't match")
                return result
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.SECRET
})