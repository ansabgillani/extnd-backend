import Cors from 'cors'
import dbConnect from '@/libs/dbConnect'
import { startVerify } from '@/libs/twilio/verify'
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
  try {
    const code = await startVerify(req.body.to)
    res.status(200).json({ success: true, data: code })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}