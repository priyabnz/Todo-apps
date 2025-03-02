export function errorMiddleware(err, req, res) {
    console.error(err.stack);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    return res.status(statusCode).json({
        message: err.message,
        ...(process.env.NODE_ENV === 'production' ? {} : { stack: err.stack })
    });
}