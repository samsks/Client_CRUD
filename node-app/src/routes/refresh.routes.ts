import { Router } from "express";
import { refreshSessionController } from "../controllers/sessions";
import { ensureIsValidDataMiddleware } from "../middlewares";
import { refreshSchema } from "../serializers/clients";

const refreshRouter = Router()

refreshRouter.post(
  "", 
  ensureIsValidDataMiddleware(refreshSchema),
  refreshSessionController
  )

export default refreshRouter