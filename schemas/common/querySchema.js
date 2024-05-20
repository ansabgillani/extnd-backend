import { object, string } from 'yup';

export const querySchema = object({
    id: string().required(),
});
