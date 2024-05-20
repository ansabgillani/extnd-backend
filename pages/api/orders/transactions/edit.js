import Cors from 'cors'
import jwt from "jsonwebtoken"
import dbConnect from '@/libs/dbConnect'
import Order from '@/models/order'
import { validate } from '@/middlewares/validate';
import { editTransactionSchema } from '@/schemas/orders/transactions/editTransaction'
import initMiddleware from '@/middlewares/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['PUT'],
    })
)
const JWT_SECRET = process.env.JWT_SECRET

const handler = async (req, res) => {
    await cors(req, res)
    await dbConnect()
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
    const token = match[1];
    const { id, role } = jwt.verify(token, JWT_SECRET);
    const { orderId, transactionId, data, setInvalid } = req.body

    try {
        const order = await Order.findById(orderId)
        if (!order) {
            throw new Error('Order not found')
        }
        else {
            if (role === 'customer' && id === order.customer) {
                if (setInvalid) {
                    await Order.update({ _id: orderId, 'transactions._id': transactionId }, {
                        '$set': {
                            'transactions.$.status': 'Invalid',
                        }
                    })
                }
                const newTransaction = await Order.findOneAndUpdate({ _id: orderId }, {
                    $push: {
                        transactions: data
                    }
                }, { new: true, runValidators: true })
                return res.status(201).json({ success: true, transaction: newTransaction })
            }
            else {
                res.status(403).json({ success: false, error: 'Access denied' })
            }
        }
    } catch (error) {
        return res.status(400).json({ success: false, error })
    }
}

export default validate({
    schema: editTransactionSchema,
    validateBody: true, methods: ['PUT'], handler,
});
