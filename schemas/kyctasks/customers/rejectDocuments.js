import { object, string } from 'yup';
import { DOCUMENT_REJECTION_REASONS } from '@/config/constants'

export const rejectDocumentSchema = object({
    id: string().required('missing id'),
    documentId: string().required('missing documentId'),
    rejectionReason: string().required('please select Rejection Reason').oneOf(DOCUMENT_REJECTION_REASONS)
});