import Cors from 'cors'
import dbConnect from '@/libs/dbConnect'
import { checkVerify } from '@/libs/twilio/verify'
import initMiddleware from '@/middlewares/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['POST'],
  })
)
export default async function handler(req, res) {
  await cors(req, res)
  await dbConnect()
  const { to, code } = req.body
  try {
    const response = await checkVerify(to, code)
    res.status(200).json({ success: true, data: response })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}