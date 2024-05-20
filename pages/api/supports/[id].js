import Cors from 'cors'
import dbConnect from '@/libs/dbConnect'
import Support from '@/models/support'
import jwt from "jsonwebtoken"
import aws from 'aws-sdk'
import { updateSupportSchema } from '@/schemas/supports/updateSupport'
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
  const s3 = new aws.S3();
  const { method, query } = req
  const { id } = query
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
  const token = match[1];
  const { role } = jwt.verify(token, JWT_SECRET);
  await dbConnect()
  if (role === 'admin') {
    if (method === 'PUT') {
      const { email, mobileNo } = req.body
      try {
        const support = await Support.findById(id)
        if (support.image !== req.body.image) {
          s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: support.image },
            async function (err) {
              if (err) return res.status(400).json({ success: false, error: err })
              else {
                Support.findOne({ $or: [{ email }, { mobileNo }], _id: { $ne: id } })
                  .then(async (savedsupport) => {
                    if (savedsupport) {
                      return res.status(422).json({ success: false, error: "Support already exists" });
                    }
                    else {
                      await Support.findByIdAndUpdate(id, req.body);
                      return res.status(200).json({ success: true, support })
                    }


                  })
              }
            })
        }
        else {
          Support.findOne({ $or: [{ email }, { mobileNo }], _id: { $ne: id } })
            .then(async (savedsupport) => {
              if (savedsupport) {
                return res.status(422).json({ success: false, error: "Support already exists " });
              }
              else {
                await Support.findByIdAndUpdate(id, req.body);
                return res.status(200).json({ success: true, support })
              }
            })
        }
      } catch (error) {
        return res.status(400).json({ success: false, error })
      }
    }

    else if (method === 'GET') {
      try {
        const support = await Support.findById(id)
          .select('-password')
        return res.status(200).json({ success: true, support });
      } catch (error) {
        return res.status(400).json({ success: false, error })
      }
    }

    else if (method === 'DELETE') {
      try {
        const support = await Support.findById(id)
        s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: support.image },
          async function (err) {
            if (err) return res.status(400).json({ success: false, error: err });  // error
            else {
              await Support.findByIdAndRemove(id);
              return res.status(200).json({ success: true, support })
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
  schema: updateSupportSchema, validateQuery: true,
  validateBody: true, methods: ['PUT'], handler
});