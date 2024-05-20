import { object, string } from 'yup';

export const uploadDocumentSchema = object({
    image: string().required('Please Upload Document'),
    type: string().required('Please Select Document Type').oneOf(['CNIC', 'Passport', 'Selfie']),

});