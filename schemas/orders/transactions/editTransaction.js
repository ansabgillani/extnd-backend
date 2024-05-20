import { object, string, number, boolean } from 'yup';

export const editTransactionSchema = object({
    orderId: string().required('missing orderId'),
    transactionId: string().required('missing transactionId'),
    setInvalid: boolean().required('setInValid required'),
    data: object({
        bankName: string().required('please enter Bank Name'),
        paymentSlip: string().required('please Upload Payment Slip '),
        IBAN: string().required('please eneter the IBAN number'),
        amountPaid: number().required('please enter the paying amount')
    })

});