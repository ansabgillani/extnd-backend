import Cors from 'cors'
import jwt from "jsonwebtoken"
import dbConnect from '@/libs/dbConnect'
import Order from '@/models/order'
import Customer from '@/models/customer'
import Merchant from '@/models/merchant'
import Support from '@/models/support'
import orderPlacementCases from '@/config/cases/orderPlacement'
import { ORDER_LOWER_LIMIT, ORDER_UPPER_LIMIT } from '@/config/constants'
import { validate } from '@/middlewares/validate';
import { createOrderSchema } from '@/schemas/orders/order/index'
import initMiddleware from '@/middlewares/init-middleware'
import { getPaginationParams } from '@/libs/getPaginationParams'

const JWT_SECRET = process.env.JWT_SECRET;
// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['POST', 'GET', 'PUT'],
    })
)
const handler = async (req, res) => {
    await cors(req, res)
    await dbConnect()

    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
    const token = match[1];

    switch (req.method) {
        case 'GET':
            try {
                const {
                    limit,
                    skip,
                    sort
                } = getPaginationParams(req.query)

                const populateQuery = [
                    { path: 'merchant', model: 'Merchant', },
                    { path: 'customer', model: 'Customer' },
                    { path: 'supportAssistant', model: 'Support' }
                ]

                const totalCount = await Order.countDocuments()
                let params = {}
                const { id } = jwt.verify(token, JWT_SECRET);
                const { isSelf, isSelfType } = req.query
                if (isSelf) {
                    params[isSelfType] = id
                }
                console.log("wowo", params)
                const orders = await Order.find(params).populate(populateQuery).skip(skip).limit(limit).sort(sort);
                console.log({ orders })
                return res.status(200).json({ success: true, totalCount, items: orders })
            } catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, error })
            }
            break;
        case 'PUT':
            try {
                const { contact_email: contactEmail, merchant, total_price_usd: totalPrice } = req.body.order;
                const customer = await Customer.findOne({ email: contactEmail });
                const orders = await Order.find({ customer: customer._id.toString() });
                console.log({ customer, contactEmail })
                const merchantObject = await Merchant.findOne({ name: merchant });
                if (orders.length > 0) {
                    console.log(1)
                    const price = Number(totalPrice)
                    if (price >= ORDER_LOWER_LIMIT) {
                        if (price < ORDER_UPPER_LIMIT) {
                            return res.status(200).json({ success: true, merchant: merchantObject, case: orderPlacementCases.ORDER_AMOUNT_LESS_THAN_UPPER_LIMIT.name })
                        } else {
                            return res.status(200).json({ success: true, merchant: merchantObject, case: orderPlacementCases.ORDER_AMOUNT_GREATER_OR_EQUAL_TO_UPPER_LIMIT.name })
                        }
                    } else {
                        return res.status(200).json({ success: true, merchant: merchantObject, case: orderPlacementCases.ORDER_AMOUNT_LESS_THAN_LOWER_LIMIT.name })
                    }
                    // To Do: Check if the previous order installments are paid & tasdeeq payment is also true
                } else {
                    const price = Number(totalPrice)
                    if (price >= ORDER_LOWER_LIMIT) {
                        if (price < ORDER_UPPER_LIMIT) {
                            return res.status(200).json({ success: true, merchant: merchantObject, case: orderPlacementCases.ORDER_AMOUNT_LESS_THAN_UPPER_LIMIT.name })
                        } else {
                            return res.status(200).json({ success: true, merchant: merchantObject, case: orderPlacementCases.ORDER_AMOUNT_GREATER_OR_EQUAL_TO_UPPER_LIMIT.name })
                        }
                    } else {
                        return res.status(200).json({ success: true, merchant: merchantObject, case: orderPlacementCases.ORDER_AMOUNT_LESS_THAN_LOWER_LIMIT.name })
                    }
                }
            } catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, error })
            }
            break;
        case 'POST':
            try {
                const authHeader = req.headers.authorization || '';
                const match = authHeader.match(/Bearer (.+)/);
                if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
                const token = match[1];
                const { id } = jwt.verify(token, JWT_SECRET);
                const orderBody = {
                    ...req.body,
                    customer: id
                }
                console.log({ orderBody })
                const order = await Order.create(orderBody)
                return res.status(201).json({ success: true, order })
            } catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, error })
            }
            break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}

export default validate({
    schema: createOrderSchema,
    validateBody: true, methods: ['POST'], handler,
});