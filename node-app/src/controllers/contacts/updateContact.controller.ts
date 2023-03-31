import { Request, Response } from "express";
import { updateContactService } from "../../services/contacts";

const updateContactController = async (req: Request, res: Response) => {
  const updatedContact = await updateContactService(req.params.id, req.body);
  return res.status(200).send(updatedContact);
};

export default updateContactController;