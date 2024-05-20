import Cors from 'cors'
import dbConnect from '@/libs/dbConnect'
import Customer from '@/models/customer'
import encrypt from '@/libs/encrypt'
import { validate } from '@/middlewares/validate';
import { registerSchema } from '@/schemas/register/index'
import initMiddleware from '@/middlewares/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['POST'],
    })
)

const handler = async (req, res) => {
    await cors(req, res)
    await dbConnect()
    try {
        const { password, email, mobileNo, ...restBody } = req.body

        const savedCustomer = await Customer.findOne({ $or: [{ email }, { mobileNo }] })
        console.log({ savedCustomer })
        if (savedCustomer) {
            return res.status(422).json({ success: false, error: "Customer already exists " });
        } else {
            const hashedPassword = await encrypt.encrypt(password)
            const customer = Customer.create({
                ...restBody,
                email,
                mobileNo,
                password: hashedPassword
            });
            res.status(201).json({ success: true, data: customer })
        }
    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}
export default validate({
    schema: registerSchema,
    validateBody: true, methods: ['POST'], handler,
})