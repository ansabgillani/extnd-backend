import { object, string } from 'yup';
import { STRONG_PASSWORD_ERROR } from '@/config/errorMessages'

export const updateMerchantPasswordSchema = object({
    merchantId: string().required('merchant not exist aganst this id'),
    password: string().required('please enter the password').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*()_?&])[A-Za-z\d@$!%*?&]{9,}$/,
        STRONG_PASSWORD_ERROR)
});