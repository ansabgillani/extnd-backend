import Cors from 'cors'
import jwt from "jsonwebtoken";
import dbConnect from "@/libs/dbConnect";
import Customer from "@/models/customer";
import { validate } from '@/middlewares/validate';
import { uploadDocumentSchema } from '@/schemas/customers/uploadDocument'
import initMiddleware from '@/middlewares/init-middleware'

const JWT_SECRET = process.env.JWT_SECRET;
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
    const { image, type } = req.body
    const { method } = req
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
    const token = match[1];
    const { id } = jwt.verify(token, JWT_SECRET);

    await dbConnect()
    if (method === 'POST') {
        try {
            const customer = await Customer.findByIdAndUpdate(id, {
                $push: {
                    documents: {
                        image,
                        docType: type,
                    }
                }
            })
            return res.status(201).json({ success: true, customer })
        } catch (error) {
            return res.status(400).json({ success: false, error })
        }
    }
}

export default validate({
    schema: uploadDocumentSchema, validateBody: true, methods: ['POST'], handler, statusCode: 422
});