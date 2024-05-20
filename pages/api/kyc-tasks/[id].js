import Cors from 'cors'
import jwt from "jsonwebtoken"
import dbConnect from '@/libs/dbConnect'
import Customer from '@/models/customer'
import { validate } from '@/middlewares/validate';
import initMiddleware from '@/middlewares/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'PUT'],
    })
)
const JWT_SECRET = process.env.JWT_SECRET
const ALLOWED_ROLES = ['admin', 'support']

const handler = async (req, res) => {
    await cors(req, res)
    const { method, query } = req
    const { id } = query
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
    const token = match[1];
    const { id: userId, role } = jwt.verify(token, JWT_SECRET);
    await dbConnect()
    if (!ALLOWED_ROLES.includes(role)) return res.status(403).json({ success: false, error: 'Access denied' })
    const customerData = await Customer.findById(id)
    if (!customerData) {
        throw new Error('Customer not found')
    } else {
        if (role === 'admin' || (role === 'support' && userId === customerData.supportAssistant)) {
            if (method === 'GET') {
                try {
                    const customer = await Customer.findById(id)
                    return res.status(200).json({ success: true, customer });
                } catch (error) {
                    return res.status(400).json({ success: false, error })
                }
            }
            else if (method === 'PUT') {
                try {
                    const customer = await Customer.findByIdAndUpdate(id, {
                        '$set': {
                            'eligibility.isEligible': true,
                        }
                    }, { new: true })
                    return res.status(200).json({ success: true, customer })
                } catch (error) {
                    return res.status(400).json({ success: false, error })
                }
            }
        } else {
            return res.status(403).json({ success: false, error: 'Access denied' })
        }
    }
}

export default validate({
    validateQuery: true, methods: ['PUT'], handler
});
