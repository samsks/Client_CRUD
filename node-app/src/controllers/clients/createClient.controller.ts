import { Request, Response } from "express";
import { createClientService } from "../../services/clients";

const createClientController = async (req: Request, res: Response) => {
  const newUser = await createClientService(req.body);

  return res.status(201).send(newUser);
};

export default createClientController;
