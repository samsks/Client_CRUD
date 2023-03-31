import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../errors";
import AppDataSource from "../../../data-source";
import Client from "../../../entities/client.entity";

const ensureClientIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientId = req.params.id || req.body.clientId;

  const clientRepository = AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOneBy({
    id: clientId,
  });

  if (!findClient) {
    throw new AppError(404, "ClientID not exists");
  }

  return next();
};

export default ensureClientIdExistsMiddleware;
