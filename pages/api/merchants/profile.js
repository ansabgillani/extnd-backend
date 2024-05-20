import Cors from 'cors'
import jwt from 'jsonwebtoken'
import dbConnect from '@/libs/dbConnect'
import Merchant from '@/models/merchant'
import { updateMerchantProfileSchema } from '@/schemas/merchants/updateMerchantProfile'
import { validate } from '@/middlewares/validate';
import initMiddleware from '@/middlewares/init-middleware'

const JWT_SECRET = process.env.JWT_SECRET;
// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['PUT', 'GET'],
    })
)

const handler = async (req, res) => {
    await cors(req, res)
    const { method } = req

    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
    const token = match[1];
    const { id } = jwt.verify(token, JWT_SECRET);

    await dbConnect()

    if (method === 'PUT') {
        try {
            const merchant = await Merchant.findByIdAndUpdate(id, req.body)
            return res.status(200).json({ success: true, merchant });
        } catch (error) {
            return res.status(400).json({ success: false, error })
        }

    }
    else if (method === 'GET') {
        try {
            const merchant = await Merchant.findById(id)
            return res.status(200).json({ success: true, merchant });
        } catch (error) {
            return res.status(400).json({ success: false, error })
        }
    }
}

export default validate({
    schema: updateMerchantProfileSchema,
    validateBody: true, methods: ['PUT'], handler
});