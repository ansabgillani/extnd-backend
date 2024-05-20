import Cors from 'cors'
import dbConnect from '@/libs/dbConnect'
import jwt from "jsonwebtoken"
import Order from '@/models/order'
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths'
import { validate } from '@/middlewares/validate';
import { approveTransactionSchema } from '@/schemas/orders/transactions/approveTransaction'
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
    const { orderId, transactionId } = req.body
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
    const token = match[1];
    const { id, role } = jwt.verify(token, JWT_SECRET);

    try {
        if (!ALLOWED_ROLES.includes(role)) return res.status(403).json({ success: false, error: 'Access denied' })
        const order = await Order.findById(orderId)
        if (!order) {
            throw new Error('Order not found')
        } else {
            if (role === 'admin' || (role === 'support' && id === order.supportAssistant)) {

                console.log(0)
                const approvedAmount = order.transactions.filter(transaction => transaction.status === 'Paid').reduce((acc, transaction) => acc + transaction.amountPaid, 0);

                console.log(1)
                const dueAmount = order.installments.filter(installment => installment.status !== 'Paid' && (differenceInCalendarMonths(installment.dueDate, new Date()) <= 1)).reduce((acc, installment) => acc + installment.amount, 0);

                console.log(2)
                const currentTransaction = order.transactions.find(transaction => transaction._id.toString() === transactionId);

                console.log(3, { dueAmount }, { approvedAmount }, currentTransaction.amountPaid)
                const overDueAmount = Number(dueAmount) - Number(approvedAmount) - currentTransaction.amountPaid;
                const totalApprovedAmount = Math.floor((Number(approvedAmount) + currentTransaction.amountPaid) / order.installments[0].amount)
                const updatedInstallments = order.installments.map((installment, i) => {
                    console.log(installment)
                    return {
                        ...installment.toObject(),
                        status: i < totalApprovedAmount ? 'Paid' : installment.status
                    }
                });
                // 4
                // dueAmount: 199
                // overDueAmount: 99
                // approvedAmount: 100
                // currentTransaction.amountPaid: 100
                console.log({ updatedInstallments, totalApprovedAmount })
                const savedOrder = await Order.updateOne({ _id: orderId, 'transactions._id': transactionId }, {
                    '$set': {
                        'transactions.$.status': 'Paid',
                        'overDueAmount': overDueAmount,
                        installments: updatedInstallments
                    }
                })
                return res.status(200).json({ success: true, order: savedOrder })
            } else {
                return res.status(403).json({ success: false, error: 'Access denied' })
            }
        }

        // 199 - 250 = 
    } catch (error) {
        console.log({ error })
        return res.status(400).json({ success: false, error })
    }
}



export default validate({
    schema: approveTransactionSchema,
    validateBody: true, methods: ['PUT'], handler,
});