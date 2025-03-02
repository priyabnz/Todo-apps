
export const validateRequest = (schema, section) =>
    (req, res, next) => {

        const { error } = schema.validate(
            req[section],
            { abortEarly: false }
        );

        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    };