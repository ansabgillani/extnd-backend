import { object, string, number } from 'yup';

export const payInstallmentSchema = object({
    orderId: string().required('missing orderId'),
    transactionId: string().required('missing transactionId'),
    bankName: string().required('please enter Bank Name'),
    paymentSlip: string().required('please Upload Payment Slip '),
    IBAN: string().required('please eneter the IBAN number'),
    amountPaid: number().required('please enter the paying amount')
});