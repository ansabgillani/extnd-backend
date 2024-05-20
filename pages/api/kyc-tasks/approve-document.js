import Cors from 'cors'
import jwt from "jsonwebtoken"
import dbConnect from '@/libs/dbConnect'
import Customer from '@/models/customer'
import { approveDocumentSchema } from "@/schemas/kyctasks/customers/approveDocuments"
import { validate } from '@/middlewares/validate';
import initMiddleware from '@/middlewares/init-middleware'
import _isEqual from 'lodash/isEqual'
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
    const { method } = req
    const { id, documentId } = req.body
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
    const token = match[1];
    const { id: userId, role } = jwt.verify(token, JWT_SECRET);

    await dbConnect()

    if (method === 'PUT') {
        try {
            if (!ALLOWED_ROLES.includes(role)) return res.status(403).json({ success: false, error: 'Access denied' })
            const customerData = await Customer.findById(id)
            if (!customerData) {
                throw new Error('Customer not found')
            } else {
                if (role === 'admin' || (role === 'support' && userId === customerData.supportAssistant)) {
                    let customer = await Customer.findOneAndUpdate({ _id: id, 'documents._id': documentId }, {
                        '$set': {
                            'documents.$.status': 'Approved',
                        }
                    }, { new: true })
                    const approvedDocuments = customer.documents.filter(document => document.status === 'Approved').map(document => document.docType)
                    const isAllDocumentsApproved = _isEqual(['CNIC', 'Passport', 'Selfie'], approvedDocuments.sort())
                    if(isAllDocumentsApproved) {
                        customer = await Customer.findOneAndUpdate({ _id: id }, {
                            '$set': {
                                'eligibility.isKYCApproved': true,
                            }
                        }, { new: true })
                    }
                    return res.status(200).json({ success: true, customer })
                }
                else {
                    return res.status(403).json({ success: false, error: 'Access denied' })
                }
            }
        } catch (error) {
            return res.status(400).json({ success: false, error })
        }
    }
}

export default validate({
    schema: approveDocumentSchema,
    validateBody: true, methods: ['PUT'], handler,
});
