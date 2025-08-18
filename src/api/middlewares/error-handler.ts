import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;

  // Log full error (stack) to stderr so server.err.log captures it for post-mortem
  try {
    if (err instanceof Error) {
      console.error(err.stack || err.message);
    } else {
      console.error(err);
    }
  } catch (logErr) {
    // ignore logging failures
  }

  const responseBody: any = {
    error: err.message || 'Internal Server Error',
    details: err.details || undefined,
  };

  // In non-production environments include stack trace to help debugging clients/tests
  if (process.env.NODE_ENV !== 'production') {
    responseBody.stack = err.stack;
  }

  res.status(status).json(responseBody);
}
