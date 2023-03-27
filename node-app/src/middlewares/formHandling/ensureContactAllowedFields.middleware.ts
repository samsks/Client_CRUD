import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";

const ensureContactAllowedFieldsMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    if (
      Object.keys(req.body).includes("id") ||
      Object.keys(req.body).includes("createdAt") ||
      Object.keys(req.body).includes("clientId")
    ) {
      throw new AppError(401, "Invalid fields");
    }

    next();
  };

export default ensureContactAllowedFieldsMiddleware;
