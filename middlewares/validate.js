import { querySchema } from '@/schemas/common/querySchema'

export function validate(params) {
    const {
        schema,
        handler,
        methods = ['POST', 'PUT'],
        statusCode = 400,
        validateQuery = false,
        validateBody = false
    } = params

    return async (req, res) => {
        if (methods.includes(req.method)) {
            try {
                if (validateQuery) await querySchema.validate(req.query, { abortEarly: true, stripUnknown: true });
                if (validateBody) await schema.validate(req.body, { abortEarly: true, stripUnknown: true });
            } catch (error) {
                return res.status(statusCode).json({ success: false, error: error.message });
            }
        }
        await handler(req, res);
    };
}

