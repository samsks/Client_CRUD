import { Request, Response } from "express";
import { createClientService } from "../../services/clients";

const createClientController = async (req: Request, res: Response) => {
  const newClient = await createClientService(req.body);

  return res.status(201).send(newClient);
};

export default createClientController;
