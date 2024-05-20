import { object, string } from 'yup';

export const approveTransactionSchema = object({
    orderId: string().required('missing orderId'),
    transactionId: string().required('missing transactionId'),
});