import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";
import { checkUUID } from "../../scripts";

const ensureValidUUIDMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.id) {
    const isParamsUUID = checkUUID({ uuid: req.params.id });

    if (!isParamsUUID) {
      throw new AppError(400, "Incorrect id format");
    }
  }

  let isBodyUUID;
  Object.keys(req.body).forEach((field) => {
    if (field.match(/(.*)Id$/)) {
      isBodyUUID = checkUUID({ uuid: req.body[field] });

      if (!isBodyUUID) {
        throw new AppError(400, "Incorrect id format");
      }
      return;
    }
  });

  return next();
};

export default ensureValidUUIDMiddleware;
