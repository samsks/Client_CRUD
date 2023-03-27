import { Request, Response } from "express";
import { updateClientService } from "../../services/clients";

const updateClientController = async (req: Request, res: Response) => {
  const updatedClient = await updateClientService(req.params.id, req.body);
  return res.status(200).send(updatedClient);
};

export default updateClientController;