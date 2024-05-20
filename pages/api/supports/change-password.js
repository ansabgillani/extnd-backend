import Cors from 'cors'
import dbConnect from '@/libs/dbConnect'
import Support from '@/models/support'
import jwt from "jsonwebtoken"
import encrypt from '@/libs/encrypt'
import { updateSupportPasswordSchema } from '@/schemas/supports/updateSupportPassword'
import { validate } from '@/middlewares/validate';
import initMiddleware from '@/middlewares/init-middleware'

const JWT_SECRET = process.env.JWT_SECRET;
// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['PUT'],
    })
)
const handler = async (req, res) => {
    await cors(req, res)
    const { method } = req
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
    const token = match[1];

    await dbConnect()

    if (method === 'PUT') {
        try {
            const { role } = jwt.verify(token, JWT_SECRET);
            if (role !== 'admin') return res.status(403).json({ success: false, error: 'Access denied' })
            let { supportId, password } = req.body
            if (password) {
                password = await encrypt.encrypt(password)
                const support = await Support.findByIdAndUpdate(supportId, { password });
                return res.status(200).json({ success: true, support })
            } else {
                return res.status(400).json({ success: false, error: 'Password is missing' })
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, error })
        }
    }
}

export default validate({
    schema: updateSupportPasswordSchema,
    validateBody: true, methods: ['PUT'], handler
});