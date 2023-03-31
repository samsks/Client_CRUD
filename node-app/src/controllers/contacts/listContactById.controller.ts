import { Request, Response } from "express";
import {  listContactByIdService } from "../../services/contacts";

const listContactByIdController = async (req: Request, res: Response) => {
    const data = await listContactByIdService(req.params.id)
    return res.status(200).send(data)
}

export default listContactByIdController
