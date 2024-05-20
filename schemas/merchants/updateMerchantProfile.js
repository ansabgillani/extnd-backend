import { object, string } from 'yup';
import { MERCHANTS_CATEGORY } from '@/config/constants';

export const updateMerchantProfileSchema = object({
    name: string().required('please enter the name'),
    email: string().required('please enter email').email(),
    mobileNo: string().required('please enter mobileNo').min(11).max(14),
    category: string().required('please select a category').oneOf(MERCHANTS_CATEGORY),
});