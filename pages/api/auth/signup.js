import {hash} from "bcrypt";

export default async function handler(req, res){
    if (req.method === 'POST') {
        if (!req.body) return res?.status(404)?.json({error: "Don't Have form data"})

        const {username, name, email, password} = req.body

        const checkExisting = await MyModel.filter({username})
        if (checkExisting) return res?.status(442)?.json({message: "JSON User already Exists !!"})
        MyModel.create({username, name, email, password: await hash(password, 12)}, function (err, data) {
            if (err) return res?.status(404)?.json({err});
            res?.status(201)?.json({status: true, user: data})
        })
    } else {
        res?.status(500)?.json({message: "HTTP method not valid only POST accepted"})
    }
}