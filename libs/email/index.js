import sgMail from '@sendgrid/mail'

const sendEmail = async ({ toEmail, subject, name }) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: toEmail,
        from: {
            email: process.env.USER_EMAIL,
            name: 'Extnd Technologies'
        },
        templateId: process.env.TEMPLATE_1,
        dynamic_template_data: {
            subject: subject,
            name: name,
        },
    };
    try {
        let promise = await sgMail.send(msg);
    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
    }

}
export default sendEmail