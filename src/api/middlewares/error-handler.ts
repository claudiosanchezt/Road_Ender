import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err?.status || 500;
  try {
    if (err instanceof Error) console.error(err.stack || err.message);
    else console.error(err);
  } catch (e) {
    // ignore
  }

  const responseBody: any = {
    error: err?.message || 'Internal Server Error',
    details: err?.details || undefined,
  };

  if (process.env.NODE_ENV !== 'production') responseBody.stack = err?.stack;

  res.status(status).json(responseBody);
}

export default errorHandler;
