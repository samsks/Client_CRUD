import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";

const ensureIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdm } = req.user;

  if (!isAdm) {
    throw new AppError(401, "Missing admin permissions");
  }

  next();
};

export default ensureIsAdmMiddleware;
