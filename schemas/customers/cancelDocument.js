import { object, string } from 'yup';

export const cancelDocumentSchema = object({
    documentId: string().required('missing credentials')
});
