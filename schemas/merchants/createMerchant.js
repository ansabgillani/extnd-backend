import { object, string } from 'yup';
import { MERCHANTS_CATEGORY } from '@/config/constants';
import { STRONG_PASSWORD_ERROR } from '@/config/errorMessages'

export const createMerchantSchema = object({
    name: string().required('please enter the name'),
    email: string().required('please enter email').email(),
    mobileNo: string().required('please enter mobileNo').min(11).max(14),
    image: string().required('please upload the image'),
    password: string().required('please enter the password').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*()_?&])[A-Za-z\d@$!%*?&]{9,}$/,
        STRONG_PASSWORD_ERROR),
    category: string().required('please select a category').oneOf(MERCHANTS_CATEGORY),
});