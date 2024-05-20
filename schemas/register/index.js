import { object, string, date } from 'yup';
import { STRONG_PASSWORD_ERROR } from '@/config/errorMessages'

export const registerSchema = object({
    CNIC: string().required('please enter the CNIC'),
    email: string().required('please enter email').email(),
    mobileNo: string().required('please enter mobileNo').min(11).max(14),
    firstName: string().required('please enter First Name'),
    lastName: string().required('please enter Last Name'),
    DOB: date().required('please select date'),
    password: string().required('please enter the password').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*()_?&])[A-Za-z\d@$!%*?&]{9,}$/,
        STRONG_PASSWORD_ERROR),
    gender: string().required('please select a gender').oneOf(['male', 'female']),
    maritalStatus: string().required('please select a marital status').oneOf(['single', 'married', ' divorced'])
});