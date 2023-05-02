import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import {compare} from "bcrypt";


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {


                // check user existance
                // const result = await CustomUsers.findOne({email: credentials.email})
                // if (!result) {
                //     throw new Error("No user found with this email please signup")
                // }
                // //compare
                // const checkPassword = await compare(credentials.password, result.password)
                // if (!checkPassword || result.email !== credentials.email) {
                //     throw new Error("Username and password doesn't match")
                // }
                const User = {username: 'ifty', password: '1234'}
                const result = await User.username === credentials.username
                // if (!result) {
                //     throw new Error("No user found with this username")
                // }
                const checkPassword = credentials.password === User.password
                if (!checkPassword || credentials.username !== User.username)
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