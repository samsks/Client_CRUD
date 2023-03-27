import { Request, Response } from "express";
import {  listClientByIdService } from "../../services/clients";

const listClientByIdController = async (req: Request, res: Response) => {
    const data = await listClientByIdService(req.params.id)
    return res.status(200).send(data)
}

export default listClientByIdController
