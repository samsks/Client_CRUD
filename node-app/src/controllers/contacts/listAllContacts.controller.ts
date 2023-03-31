import { Request, Response } from "express";
import { listAllContactsService } from "../../services/contacts";

const listAllContactsController = async (req: Request, res: Response) => {
  const data = await listAllContactsService(req.user.id);
  return res.status(200).send(data);
};

export default listAllContactsController;
