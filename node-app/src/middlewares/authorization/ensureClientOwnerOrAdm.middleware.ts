import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";
import AppDataSource from "../../data-source";
import Contact from "../../entities/contact.entity";

const ensureClientOwnerOrAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(1, req.path);
  console.log(2, req.baseUrl);
  console.log(3, req.originalUrl);
  const API_DETAIL = process.env.API_DETAIL
  
  if (req.path.startsWith(`${API_DETAIL}/clients`) || req.baseUrl.startsWith(`${API_DETAIL}/clients`)) {
    if (req.user.isAdm == false && req.user.id != req.params.id) {
      throw new AppError(401, "Missing permissions");
    }
  } else if (req.baseUrl.startsWith(`${API_DETAIL}/contacts`)) {
    console.log(21, "teste");
    
    if(req.path.length > 1){
      console.log(req.originalUrl);
      const contactId = req.params.id; // or req.path.slice(1)

      const user = await AppDataSource.getRepository(Contact)
        .createQueryBuilder()
        .select("client.id", "id")
        .from(Contact, "contact")
        .innerJoin("contact.client", "client")
        .where("contact.id = :contactId", { contactId })
        .getRawOne();

      if (req.user.isAdm == false && req.user.id != user.id) {
        throw new AppError(401, "Missing admin permissions");
      }
    }

    
  }

  return next();
};

export default ensureClientOwnerOrAdmMiddleware;
