import { Router } from "express";
import { createContactController, deleteContactController, listAllContactsController, listContactByIdController, updateContactController } from "../controllers/contacts";
import { ensureAuthMiddleware, ensureClientIdExistsMiddleware, ensureClientOwnerOrAdmMiddleware, ensureContactIdExistsMiddleware, ensureIsValidDataMiddleware, ensureValidUUIDMiddleware } from "../middlewares";
import { contactReqSchema, updateContactReqSchema } from "../serializers/contacts";

const contactRouter = Router()

contactRouter.post(
  "",
  ensureAuthMiddleware,
  ensureValidUUIDMiddleware,
  ensureClientIdExistsMiddleware,
  ensureClientOwnerOrAdmMiddleware,
  ensureIsValidDataMiddleware(contactReqSchema),
  createContactController
  )

contactRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureValidUUIDMiddleware,
  ensureContactIdExistsMiddleware,
  ensureClientOwnerOrAdmMiddleware,
  ensureIsValidDataMiddleware(updateContactReqSchema),
  updateContactController
  )

contactRouter.get(
  "",
  ensureAuthMiddleware,
  listAllContactsController
)

contactRouter.get(
  "/:id",
  ensureAuthMiddleware,
  ensureValidUUIDMiddleware,
  ensureContactIdExistsMiddleware,
  ensureClientOwnerOrAdmMiddleware,
  listContactByIdController
)

contactRouter.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureValidUUIDMiddleware,
  ensureContactIdExistsMiddleware,
  ensureClientOwnerOrAdmMiddleware,
  deleteContactController
)

export default contactRouter