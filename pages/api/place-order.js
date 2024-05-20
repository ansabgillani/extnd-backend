import Cors from 'cors'
import { serialize } from 'cookie';
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
    const { method, body } = req
    if (method === 'POST') {
        try {
            res.setHeader('Set-Cookie', [
                serialize('order', JSON.stringify(body), { path: '/' }),
                serialize('extnd', '', {
                    maxAge: -1,
                    path: '/',
                }),
                serialize('role', '', {
                    maxAge: -1,
                    path: '/',
                }),
            ]);
            res.redirect(307, '/login')
        } catch (error) {
            console.log({ error })
            return res.status(400).json({ success: false, error })
        }
    }
}

export default handler
