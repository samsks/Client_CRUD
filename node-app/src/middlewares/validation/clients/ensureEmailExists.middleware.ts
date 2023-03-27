import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../../data-source";
import { Client } from "../../../entities";
import { AppError } from "../../../errors";

const ensureClientEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOneBy({
    email: req.body.email,
  });
  
  if (req.method === 'PATCH'){
    if (findClient?.id === req.user.id){
      return next();
    }
  }

  if (findClient) {
    throw new AppError(409, "Email already registered");
  }

  return next();
};

export default ensureClientEmailExistsMiddleware;
