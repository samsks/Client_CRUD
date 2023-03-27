import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";

const ensureUserAllowedFieldsMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    if (
      Object.keys(req.body).includes("id") ||
      Object.keys(req.body).includes("isAdm") ||
      Object.keys(req.body).includes("createdAt")
    ) {
      throw new AppError(401, "Invalid fields");
    }

    next();
  };

export default ensureUserAllowedFieldsMiddleware;
