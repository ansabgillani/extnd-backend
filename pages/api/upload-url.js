import Cors from 'cors'
import aws from 'aws-sdk';
import initMiddleware from '@/middlewares/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['POST', 'GET'],
    })
)

export default async function handler(req, res) {
    await cors(req, res)
    console.log({ ss: process.env.ACCESS_KEY })
    try {
        aws.config.update({
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY,
            region: process.env.REGION,
            signatureVersion: 'v4',
        });

        const s3 = new aws.S3();
        const post = await s3.createPresignedPost({
            Bucket: process.env.BUCKET_NAME,
            Fields: {
                key: req.query.file,
            },
            Expires: 60, // seconds
            Conditions: [
                ['content-length-range', 0, 1048576], // up to 1 MB
            ],
        });
        return res.status(200).json({ success: true, ...post });
    }
    catch (error) {
        console.log({ error })
        return res.status(400).json({ success: false, error })
    }
}