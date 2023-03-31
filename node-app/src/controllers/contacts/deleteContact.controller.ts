import { Request, Response } from "express";
import { deleteContactService } from "../../services/contacts";

const deleteContactController = async (req: Request, res: Response) => {
  await deleteContactService(req.params.id);
  return res.status(204).send();
};
export default deleteContactController;
