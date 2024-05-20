import Cors from 'cors'
import dbConnect from '@/libs/dbConnect'
import Customer from '@/models/customer'
import initMiddleware from '@/middlewares/init-middleware'
import { getPaginationParams } from '@/libs/getPaginationParams'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET'],
    })
)

const handler = async (req, res) => {
    await cors(req, res)
    const { method } = req
    await dbConnect()
    if (method === 'GET') {
        try {
            const {
                limit,
                skip,
                sort
            } = getPaginationParams(req.query)
            const populateQuery = [
                { path: 'supportAssistant', model: 'Support' }
            ]
            const totalCount = await Customer.countDocuments()
            const customers = await Customer.find().populate(populateQuery).skip(skip).limit(limit).sort(sort)
            console.log(customers)
            res.status(200).json({ success: true, totalCount, items: customers })
        } catch (error) {
            return res.status(400).json({ success: false, error })
        }

    }
}
export default handler