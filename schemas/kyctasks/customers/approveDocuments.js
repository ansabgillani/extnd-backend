import { object, string } from 'yup';

export const approveDocumentSchema = object({
    id: string().required('missing id'),
    documentId: string().required('missing documentId')
});