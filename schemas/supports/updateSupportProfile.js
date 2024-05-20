import { object, string, date } from 'yup';

export const updateSupportProfileSchema = object({
    name: string().required('please enter the name'),
    email: string().required('please enter email').email(),
    DOB: date().required('please select date'),
    mobileNo: string().required('please enter mobileNo').min(11).max(14),
    gender: string().required('please select a gender').oneOf(['male', 'female']),
});