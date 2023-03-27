import { Router } from "express";
import { createSessionController } from "../controllers/sessions";
import { ensureIsValidDataMiddleware } from "../middlewares";
import { sessionSchema } from "../serializers/clients";

const sessionRouter = Router()

sessionRouter.post(
  "", 
  ensureIsValidDataMiddleware(sessionSchema),
  createSessionController
  )

export default sessionRouter