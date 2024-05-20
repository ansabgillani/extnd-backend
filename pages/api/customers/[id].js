import Cors from 'cors'
import dbConnect from '@/libs/dbConnect'
import Customer from '@/models/customer'
import { validate } from '@/middlewares/validate';
import { updateSupportAssistantSchema } from '@/schemas/customers/updateSupportAssistant'
import initMiddleware from '@/middlewares/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['PUT', 'POST'],
    })
)
const handler = async (req, res) => {
    await cors(req, res)
    const { id } = req.query
    await dbConnect()
    switch (req.method) {

        case 'PUT':
            try {
                const customer = await Customer.findByIdAndUpdate(id, req.body)
                return res.status(200).json({ success: true, customer })
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
export default validate({
    schema: updateSupportAssistantSchema,
    validateBody: true, validateQuery: true, methods: ['PUT'], handler,
});