import Cors from 'cors'
import jwt from "jsonwebtoken"
import dbConnect from '@/libs/dbConnect'
import Merchant from '@/models/merchant'
import aws from 'aws-sdk'
import { updateMerchantSchema } from '@/schemas/merchants/updateMerchant'
import { validate } from '@/middlewares/validate';
import initMiddleware from '@/middlewares/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['PUT', 'GET', 'DELETE'],
  })
)

const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req, res) => {
  await cors(req, res)
  await dbConnect()
  const s3 = new aws.S3();
  const { method, query } = req
  const { id } = query
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
  const token = match[1];
  const { role } = jwt.verify(token, JWT_SECRET);

  if (role === 'admin') {
    if (method === 'PUT') {
      const { email, mobileNo } = req.body
      try {
        const merchant = await Merchant.findById(id)
        if (merchant.image !== req.body.image) {
          s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: merchant.image },
            async function (err) {
              if (err) return res.status(400).json({ success: false, error: err })
              else {
                Merchant.findOne({ $or: [{ email }, { mobileNo }], _id: { $ne: id } })
                  .then(async (savedmerchant) => {
                    if (savedmerchant) {
                      return res.status(422).json({ success: false, error: "Merchant already exists" });
                    }
                    else {
                      await Merchant.findByIdAndUpdate(id, req.body);
                      return res.status(200).json({ success: true, merchant })
                    }
                  })
              }
            })
        }
        else {
          Merchant.findOne({ $or: [{ email }, { mobileNo }], _id: { $ne: id } })
            .then(async (savedmerchant) => {
              if (savedmerchant) {
                return res.status(422).json({ success: false, error: "Merchant already exists" });
              }
              else {
                await Merchant.findByIdAndUpdate(id, req.body);
                return res.status(200).json({ success: true, merchant })
              }
            })
        }
      } catch (error) {
        return res.status(400).json({ success: false, error })
      }
    }

    else if (method === 'GET') {
      try {
        const merchant = await Merchant.findById(id)
          .select('-password')
        return res.status(200).json({ success: true, merchant });
      } catch (error) {
        return res.status(400).json({ success: false, error })
      }
    }

    else if (method === 'DELETE') {
      try {
        const merchant = await Merchant.findById(id)
        s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: merchant.image },
          async function (err) {
            if (err) return res.status(400).json({ success: false, error: err })
            else {
              await Merchant.findByIdAndRemove(id);
              return res.status(200).json({ success: true, merchant })
            }
          })
      } catch (error) {
        return res.status(400).json({ success: false, error })
      }
    }
  }
  else {
    return res.status(403).json({ success: false, error: 'Access denied' })
  }
}

export default validate({
  schema: updateMerchantSchema, validateQuery: true,
  validateBody: true, methods: ['PUT'], handler
});

