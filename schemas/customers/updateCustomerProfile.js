import { object, string, date } from 'yup';

export const updateCustomerProfileSchema = object({
    firstName: string().required('please enter the first name'),
    lastName: string().required('please enter the last name'),
    email: string().required('please enter email').email(),
    DOB: date().required('please select date'),
    mobileNo: string().required('please enter mobileNo').min(11).max(14),
    gender: string().required('please select a gender').oneOf(['male', 'female']),
});