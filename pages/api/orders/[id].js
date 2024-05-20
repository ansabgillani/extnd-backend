import Cors from 'cors'
import jwt from "jsonwebtoken"
import dbConnect from '@/libs/dbConnect'
import Order from '@/models/order'
import Support from '@/models/support'
import Customer from '@/models/customer'
import Merchant from '@/models/merchant'
import orderPlacementCases from '@/config/cases/orderPlacement'
import { ORDER_LOWER_LIMIT, ORDER_UPPER_LIMIT } from '@/config/constants'
import initMiddleware from '@/middlewares/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'PUT', 'POST'],
    })
)

export default async function handler(req, res) {
    await cors(req, res)
    const { id } = req.query
    await dbConnect()
    switch (req.method) {
        case 'GET':
            try {
                const populateQuery = [
                    { path: 'merchant', model: 'Merchant', },
                    { path: 'customer', model: 'Customer' },
                    { path: 'supportAssistant', model: 'Support' }
                ]
                const order = await Order.findById(id).populate(populateQuery);
                if (!order) return res.status(404).json({ success: false, error: "Order Not Found" })
                else return res.status(200).json({ success: true, order })
            } catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, error })
            }
        case 'PUT':
            try {
                const order = await Order.findByIdAndUpdate(id, req.body)
                return res.status(200).json({ success: true, order })
            } catch (error) {
                return res.status(400).json({ success: false, error })
            }
        case 'POST':
            try {
            } catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, error })
            }
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}