// eslint-disable-next-line consistent-return
const startVerify = (to, channel = 'sms') => {
    return new Promise((resolve, reject) => {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        client.verify.services(process.env.VERIFY_SERVICE_SID)
            .verifications
            .create({ to, channel })
            .then(verification => {
                resolve({
                    success: true,
                    status: verification.status
                })
            })
            .catch(error => {
                console.log(error);
                reject({
                    success: false,
                    error: {
                        message: error.message,
                        moreInfo: error.moreInfo,
                    },
                });

            });
    })
}

const checkVerify = (to, code) => {
    return new Promise((resolve, reject) => {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);

        client.verify.services(process.env.VERIFY_SERVICE_SID)
            .verificationChecks
            .create({ to, code })
            .then(verification_check => {

                if (verification_check.status === 'approved') {
                    resolve({
                        success: true,
                        statusCode: 200,
                        message: 'Verification success.',
                        status: verification_check.status
                    })
                } else {
                    reject({
                        success: false,
                        statusCode: 401,
                        message: 'Incorrect token.',
                    })
                }
            })
            .catch(error => {
                console.log(error);
                reject({
                    success: false,
                    statusCode: 500,
                    message: error.message,
                });

            });
    })
}

export {
    startVerify,
    checkVerify
}