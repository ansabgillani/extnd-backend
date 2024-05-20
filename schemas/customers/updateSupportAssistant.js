import { object, string } from 'yup';

export const updateSupportAssistantSchema = object({
    supportAssistant: string().required('Invalid Id')
});
