import jwt from "jsonwebtoken";
import Cors from 'cors'
import dbConnect from "@/libs/dbConnect";
import Customer from "@/models/customer";
import { validate } from '@/middlewares/validate';
import { cancelDocumentSchema } from "@/schemas/customers/cancelDocument"
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
    const { documentId } = req.body
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
    const token = match[1];
    const { id } = jwt.verify(token, JWT_SECRET);

    await dbConnect()

    if (method === 'PUT') {
        try {
            const customer = await Customer.findOneAndUpdate({ _id: id, 'documents._id': documentId }, {
                '$set': {
                    'documents.$.status': 'Cancelled',
                }
            }, { new: true })
            return res.status(200).json({ success: true, customer })
        } catch (error) {
            return res.status(400).json({ success: false, error })
        }
    }
}

export default validate({
    schema: cancelDocumentSchema,
    validateBody: true, methods: ['PUT'], handler,
})
