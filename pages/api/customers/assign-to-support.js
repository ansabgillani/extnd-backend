import Cors from 'cors'
import jwt from "jsonwebtoken"
import dbConnect from '@/libs/dbConnect'
import Customer from '@/models/customer'
import Support from '@/models/support'
import initMiddleware from '@/middlewares/init-middleware'
import { getPaginationParams } from '@/libs/getPaginationParams'

const JWT_SECRET = process.env.JWT_SECRET;
// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET'],
    })
)
export default async function handler(req, res) {
    await cors(req, res)
    await dbConnect()

    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
    const token = match[1];
    const { id } = jwt.verify(token, JWT_SECRET);

    switch (req.method) {
        case 'GET':
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
                const customers = await Customer.find({ 'supportAssistant': id }).populate(populateQuery).skip(skip).limit(limit).sort(sort)
                return res.status(200).json({ success: true, totalCount, items: customers })
            } catch (error) {
                return res.status(422).json({ success: false, error })
            }

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}