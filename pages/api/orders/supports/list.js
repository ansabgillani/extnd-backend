import Cors from 'cors'
import dbConnect from '@/libs/dbConnect'
import jwt from "jsonwebtoken"
import encrypt from '@/libs/encrypt'

import initMiddleware from '@/middlewares/init-middleware'
import Support from '@/models/support'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET'],
    })
)

const JWT_SECRET = process.env.JWT_SECRET

const handler = async (req, res) => {
    await cors(req, res)
    await dbConnect()

    try {
        const supports = await Support.find()
        res.status(200).json({ success: true, supports })

    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

export default handler
