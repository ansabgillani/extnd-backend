import { object, string } from 'yup';

export const approveInstallmentSchema = object({
    orderId: string().required('missing orderId'),
    installmentId: string().required('missing installmentId'),
});