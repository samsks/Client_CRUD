import { Router } from "express";
import { createClientController, deleteClientController, listAllClientsController, listClientByIdController, updateClientController } from "../controllers/clients";
import { ensureAuthMiddleware, ensureClientEmailExistsMiddleware, ensureClientIdExistsMiddleware, ensureClientOwnerOrAdmMiddleware, ensureIsAdmMiddleware, ensureIsValidDataMiddleware, ensureValidUUIDMiddleware } from "../middlewares";
import { clientReqSchema, updateClientReqSchema } from "../serializers/clients";

const clientRouter = Router()

clientRouter.post(
  "", 
  ensureIsValidDataMiddleware(clientReqSchema), 
  ensureClientEmailExistsMiddleware, 
  createClientController
  )

clientRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureValidUUIDMiddleware,
  ensureClientIdExistsMiddleware,
  ensureClientOwnerOrAdmMiddleware,
  ensureClientEmailExistsMiddleware,
  ensureIsValidDataMiddleware(updateClientReqSchema),
  updateClientController
  )

clientRouter.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listAllClientsController
)

clientRouter.get(
  "/:id",
  ensureAuthMiddleware,
  ensureValidUUIDMiddleware,
  ensureClientIdExistsMiddleware,
  ensureClientOwnerOrAdmMiddleware,
  listClientByIdController
)

clientRouter.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureValidUUIDMiddleware,
  ensureClientIdExistsMiddleware,
  ensureClientOwnerOrAdmMiddleware,
  deleteClientController
)

export default clientRouter