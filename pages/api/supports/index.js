import Cors from 'cors'
import jwt from "jsonwebtoken"
import dbConnect from '@/libs/dbConnect'
import Support from '@/models/support'
import encrypt from '@/libs/encrypt'
import { createSupportSchema } from '@/schemas/supports/createSupport'
import { validate } from '@/middlewares/validate';
import initMiddleware from '@/middlewares/init-middleware'
import { getPaginationParams } from '@/libs/getPaginationParams'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['POST', 'GET'],
  })
)

const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req, res) => {
  await cors(req, res)
  await dbConnect()
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) return res.status(401).json({ success: false, error: 'Unauthorized' })
  const token = match[1];
  const { id, role } = jwt.verify(token, JWT_SECRET);
  if (role === 'admin') {
    switch (req.method) {
      case 'GET':
        return getSupports();
      case 'POST':
        return createSupport();
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
  else {
    return res.status(403).json({ success: false, error: 'Access denied' })
  }

  function createSupport() {
    const { email, password, mobileNo } = req.body
    Support.findOne({ $or: [{ email }, { mobileNo }] })
      .then((savedsupport) => {
        if (savedsupport) {
          return res.status(422).json({ success: false, error: "Support already exists " });
        }
        else {
          encrypt.encrypt(password).then((hashedpassword) => {
            const support = new Support(
              {
                ...req.body,
                password: hashedpassword
              }
            );
            support
              .save()
              .then(result => res.status(201).json({ success: true, support: result }))
              .catch(error => res.status(400).json({ success: false, error }));
          })
        }
      })
  }

  async function getSupports() {
    try {
      const {
        limit,
        skip,
        sort
      } = getPaginationParams(req.query)
      const totalCount = await Support.countDocuments()
      const supports = await Support.find().skip(skip).limit(limit).sort(sort)
      res.status(200).json({ success: true, totalCount, items: supports })
    } catch (error) {
      res.status(400).json({ success: false, error })
    }
  }

}

export default validate({
  schema: createSupportSchema,
  validateBody: true, methods: ['POST'], handler
});