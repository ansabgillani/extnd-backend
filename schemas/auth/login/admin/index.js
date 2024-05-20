import { object, string } from 'yup';

export const adminLoginSchema = object({
    email: string().required('please enter email or password').email(),
    password: string().required('please enter email or password'),
});
