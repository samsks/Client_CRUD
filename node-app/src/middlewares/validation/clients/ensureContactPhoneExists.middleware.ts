import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../../data-source";
import Contact from "../../../entities/contact.entity";
import { AppError } from "../../../errors";

const ensureContactPhoneExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const findContact = await contactRepository
  .createQueryBuilder('contact')
  .leftJoinAndSelect('contact.client', 'client')
  .where('contact.phone = :phone', { phone: req.body.phone })
  .andWhere('client.id = :clientId', { clientId: req.user.id })
  .getOne();

  // Se query builder for a forma correta de fazer, não precisarei da comparação
  if(findContact?.client.id === req.user.id && findContact.full_name === req.body.full_name){
    
  }


  if (req.method === 'PATCH'){
    if (findContact?.id === req.user.id){
      return next();
    }
  }

  if (findContact) {
    throw new AppError(409, "Phone already registered");
  }

  return next();
};

export default ensureContactPhoneExistsMiddleware;
