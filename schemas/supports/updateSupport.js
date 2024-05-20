import { object, string, date } from 'yup';

export const updateSupportSchema = object({
    name: string().required('please enter the name'),
    email: string().required('please enter email').email(),
    mobileNo: string().required('please enter mobileNo').min(11).max(14),
    image: string().required('please upload the image'),
    DOB: date().required('please select date'),
    gender: string().required('please select a gender').oneOf(['male', 'female']),
});