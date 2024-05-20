import { object, string } from 'yup';
import { TRANSACTION_REJECTION_REASONS } from '@/config/constants'

export const rejectTransactionSchema = object({
    orderId: string().required('missing orderId'),
    transactionId: string().required('missing transactionId'),
    rejectionReason: string().required('please select Rejection Reason').oneOf(TRANSACTION_REJECTION_REASONS)
});
