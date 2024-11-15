import { NextFunction, Request, Response } from 'express';

export const asyncWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(req, error);
      next(error); // Passes error to error handling middleware
    }
  };
};
