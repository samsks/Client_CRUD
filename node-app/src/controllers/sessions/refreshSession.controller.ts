import { Request, Response } from "express";
import { refreshSessionService } from "../../services/sessions";

const refreshSessionController = async (req: Request, res: Response) => {
  const token = await refreshSessionService(req.body);
  return res.status(200).send(token);
};

export default refreshSessionController;