import Cors from 'cors'
import dbConnect from '@/libs/dbConnect'
import Order from '@/models/order'
import { validate } from '@/middlewares/validate';
import { rejectTransactionSchema } from '@/schemas/orders/transactions/rejectTransaction'
import initMiddleware from '@/middlewares/init-middleware'
import jwt from "jsonwebtoken"
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
    const { orderId, transactionId, rejectionReason } = req.body
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
    const token = match[1];
    const { id, role } = jwt.verify(token, JWT_SECRET);

    try {
        if (!ALLOWED_ROLES.includes(role)) return res.status(403).json({ success: false, error: 'Access is denied' })
        const order = await Order.findById(orderId)
        if (!order) {
            throw new Error('Order not found')
        } else {
            if (role === 'admin' || (role === 'support' && id === order.supportAssistant)) {
                const order = await Order.update({ _id: orderId, 'transactions._id': transactionId }, {
                    '$set': {
                        'transactions.$.status': 'Rejected',
                        'transactions.$.rejectionReason': rejectionReason,
                    }
                })
                return res.status(200).json({ success: true, order })
            }
            else {
                return res.status(403).json({ success: false, error: 'Access are denied' })
            }
        }


    } catch (error) {
        return res.status(400).json({ success: false, error })
    }
}

export default validate({
    schema: rejectTransactionSchema,
    validateBody: true, methods: ['PUT'], handler,
});
