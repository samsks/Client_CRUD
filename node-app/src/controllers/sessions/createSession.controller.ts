import { Request, Response } from "express";
import { createSessionService } from "../../services/sessions";

const createSessionController = async (req: Request, res: Response) => {
  const tokens = await createSessionService(req.body);
  return res.status(200).send(tokens);
};

export default createSessionController;