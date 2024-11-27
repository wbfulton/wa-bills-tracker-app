import axios from "axios";
import { NextFunction, Request, Response } from "express";

export const asyncWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // console.log(req, error);
      next(error); // Passes error to error handling middleware
    }
  };
};

export const filesClient = axios.create({
  baseURL: "https://lawfilesext.leg.wa.gov",
});

export const fiscalClient = axios.create({
  baseURL: "https://fnspublic.ofm.wa.gov",
});

export const legislationClient = axios.create({
  baseURL: "https://wslwebservices.leg.wa.gov",
});

export const scrapperClient = axios.create({
  baseURL: "https://app.leg.wa.gov",
});
