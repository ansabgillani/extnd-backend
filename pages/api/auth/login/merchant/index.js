import Cors from 'cors'
import jwt from "jsonwebtoken";
import dbConnect from "@/libs/dbConnect";
import Merchant from "@/models/merchant";
import encrypt from "@/libs/encrypt";
import { validate } from '@/middlewares/validate';
import { loginSchema } from '@/schemas/common/loginSchema'
import sendEmail from '@/libs/email'

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
  await dbConnect();
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ success: false, error: "please enter email or password" });
    }
    Merchant.findOne({ email }).then((savedMerchant) => {
      if (!savedMerchant) {
        return res.status(422).json({ success: false, error: "invalid email or password" });
      }

      encrypt
        .compare(password, savedMerchant.password)
        .then(async (domatch) => {
          if (domatch) {
            const role = "merchant";
            const name = savedMerchant.name;
            const token = jwt.sign(
              { id: savedMerchant.id, role, name },
              JWT_SECRET
            );
            res.json({ success: true, token, role, name });
            await sendEmail({
              subject: "Login ",
              toEmail: savedMerchant.email,
              name: savedMerchant.name
            })
          } else {
            return res
              .status(422)
              .json({ success: false, error: "invalid email or password" });
          }
        })
        .catch((error) => {
          return res.status(500).json({ success: false, error });
        });
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
}

export default validate({
  schema: loginSchema,
  validateBody: true, methods: ['POST'], handler, statusCode: 422
});