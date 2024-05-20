import { object, string, date } from 'yup';
import { STRONG_PASSWORD_ERROR } from '@/config/errorMessages'

export const createSupportSchema = object({
    name: string().required('please enter the name'),
    email: string().required('please enter email').email(),
    mobileNo: string().required('please enter mobileNo').min(11).max(14),
    image: string().required('please upload the image'),
    DOB: date().required('please select date'),
    password: string().required('please enter the password').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*()_?&])[A-Za-z\d@$!%*?&]{9,}$/,
        STRONG_PASSWORD_ERROR),
    gender: string().required('please select a gender').oneOf(['male', 'female']),
});