import { Request, Response } from "express";
import { listAllClientsService } from "../../services/clients";

const listAllClientsController = async (req: Request, res: Response) => {
  const data = await listAllClientsService();
  return res.status(200).send(data);
};

export default listAllClientsController;
