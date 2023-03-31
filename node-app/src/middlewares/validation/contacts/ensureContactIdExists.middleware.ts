import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../errors";
import AppDataSource from "../../../data-source";
import Contact from "../../../entities/contact.entity";

const ensureContactIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactId = req.params.id || req.body.contactId;

  const contactRepository = AppDataSource.getRepository(Contact);

  const findContact = await contactRepository.findOneBy({
    id: contactId,
  });

  if (!findContact) {
    throw new AppError(404, "ContactID not exists");
  }

  return next();
};

export default ensureContactIdExistsMiddleware;
