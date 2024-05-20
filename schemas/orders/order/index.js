import { object, string, number, date, array } from 'yup';

export const createOrderSchema = object({
    merchant: string().required('missing merchantId'),
    transactions: array(
        object({
            bankName: string().required('please enter Bank Name'),
            paymentSlip: string().required('please Upload Payment Slip '),
            IBAN: string().required('please enter the IBAN number'),
            amountPaid: number().required('please enter the paying amount'),
            paidOn: date().required('Paid date missing'),
            paymentMethod: string().required('please select the payment method'),
            transactionId: string().required('missing transactionId'),
        })).required().min(0),
    items: array(
        object({
            description: string().required('descrpition is missing'),
            name: string().required('name is missing '),
            unitPrice: string().required('unit price is missing'),
            quantity: number().required('quantity is missing'),

        })).required().min(0),

    installments: array(
        object({
            title: string().required('title is missing '),
            dueDate: string().required('due Date  is missing'),
            amount: number().required('amount is missing'),

        })).required().min(0),

});