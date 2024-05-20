import Cors from 'cors'
import jwt from "jsonwebtoken"
import dbConnect from '@/libs/dbConnect'
import Customer from '@/models/customer'
import { rejectDocumentSchema } from "@/schemas/kyctasks/customers/rejectDocuments"
import { validate } from '@/middlewares/validate';
import initMiddleware from '@/middlewares/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['PUT'],
    })
)

const JWT_SECRET = process.env.JWT_SECRET;
const ALLOWED_ROLES = ['admin', 'support']

const handler = async (req, res) => {
    await cors(req, res)
    await dbConnect()
    const { method } = req
    const { id, documentId, rejectionReason } = req.body
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
    const token = match[1];
    const { id: userId, role } = jwt.verify(token, JWT_SECRET);

    if (method === 'PUT') {
        try {
            if (!ALLOWED_ROLES.includes(role)) return res.status(403).json({ success: false, error: 'Access denied' })
            const customerData = await Customer.findById(id)
            if (!customerData) {
                throw new Error('Customer not found')
            } else {
                if (role === 'admin' || (role === 'support' && userId === customerData.supportAssistant)) {
                    const customer = await Customer.findOneAndUpdate({ _id: id, 'documents._id': documentId }, {
                        '$set': {
                            'documents.$.status': 'Invalid',
                            'documents.$.rejectionReason': rejectionReason
                        }
                    }, { new: true })
                    return res.status(200).json({ success: true, customer })
                }
                else {
                    return res.status(403).json({ success: false, error: 'Access denied' })
                }
            }
        } catch (error) {
            return res.status(400).json({ success: false, error })
        }
    }
}

export default validate({
    schema: rejectDocumentSchema,
    validateBody: true, methods: ['PUT'], handler,
});

