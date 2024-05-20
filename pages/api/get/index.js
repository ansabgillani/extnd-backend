
import Cors from 'cors'
import AWS from 'aws-sdk'
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

export default async function handler(req, res) {
    await cors(req, res)
    return handleimage()

    async function handleimage() {
        console.log('start')
        AWS.config.update({
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY,
        });
        let s3 = new AWS.S3();
        var params = {
            Bucket: 'extnd-user-data',
            Key: 'js.png'
        }

        const data = await s3.getObject(
            params, function (err, file) {

                if (file) {
                    let image = "data:image/jpeg;base64," + encode(file.Body)


                    console.log('url', image)
                    return res.status(201).json({ success: true, imageurl: image })
                } else return res.status(400).json({ success: false, imageurl: err })
                function encode(data) {
                    let buf = Buffer.from(data);
                    let base64 = buf.toString('base64');
                    return base64
                }
            })
    }

}
