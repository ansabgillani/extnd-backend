import { object, string } from 'yup';

export const loginSchema = object({
    email: string().required('please enter email or password').email(),
    password: string().required('please enter email or password'),
});
