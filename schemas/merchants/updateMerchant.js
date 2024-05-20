import { object, string } from 'yup';
import { MERCHANTS_CATEGORY } from '@/config/constants';

export const updateMerchantSchema = object({
    name: string().required('please enter the name'),
    email: string().required('please enter email').email(),
    mobileNo: string().required('please enter mobileNo').min(11).max(14),
    image: string().required('please upload the image'),
    category: string().required('please select a category').oneOf(MERCHANTS_CATEGORY),
});