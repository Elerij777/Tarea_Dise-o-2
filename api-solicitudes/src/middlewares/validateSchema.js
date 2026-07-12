
export const validateSchema = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Error de validación',
            errors: result.error.errors
        });
    }

    req.body = result.data;
    next();
};

