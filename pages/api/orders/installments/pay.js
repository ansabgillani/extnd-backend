import Cors from 'cors'
import jwt from "jsonwebtoken"
import dbConnect from '@/libs/dbConnect'
import Order from '@/models/order'
import Customer from '@/models/customer'
import Merchant from '@/models/merchant'
import { validate } from '@/middlewares/validate';
import { payInstallmentSchema } from '@/schemas/orders/installments/payInstallment'
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

const handler = async (req, res) => {
    await cors(req, res)
    await dbConnect()
    const { orderId, bankName, paymentSlip, IBAN, amountPaid, transactionId } = req.body
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
    const token = match[1];
    const { id, role } = jwt.verify(token, JWT_SECRET);

    try {
        const order = await Order.findById(orderId).populate('customer').populate('merchant')
        if (!order) {
            throw new Error('Order not found')
        }
        else {
            if (role === 'customer' && id === order.customer._id.toString() ) {
                const { upperLimit } = order.limits;
                const { totalOrderAmount } = order
                if(totalOrderAmount > upperLimit && order.merchant.category === "CATEGORY_A") {
                    if(order.customer.eligibility.isKYCApproved) {
                        const order = await Order.findOneAndUpdate({ _id: orderId }, {
                            $push: {
                                transactions: {
                                    bankName,
                                    amountPaid,
                                    paymentSlip,
                                    IBAN,
                                    transactionId
                                }
                            }
                        }, { new: true, runValidators: true })
                        return res.status(200).json({ success: true, order })
                    } else {
                        res.status(401).json({ success: false, error: 'You are not allowed to pay. Your KYC isn`t approved yet' })
                    }
                } else {
                    const order = await Order.findOneAndUpdate({ _id: orderId }, {
                        $push: {
                            transactions: {
                                bankName,
                                amountPaid,
                                paymentSlip,
                                IBAN,
                                transactionId
                            }
                        }
                    }, { new: true, runValidators: true })
                    return res.status(200).json({ success: true, order })
                }
                
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
    schema: payInstallmentSchema,
    validateBody: true, methods: ['PUT'], handler,
});