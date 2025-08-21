"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    const status = err?.status || 500;
    try {
        if (err instanceof Error)
            console.error(err.stack || err.message);
        else
            console.error(err);
    }
    catch (e) {
        // ignore
    }
    const responseBody = {
        error: err?.message || 'Internal Server Error',
        details: err?.details || undefined,
    };
    if (process.env.NODE_ENV !== 'production')
        responseBody.stack = err?.stack;
    res.status(status).json(responseBody);
}
exports.default = errorHandler;
