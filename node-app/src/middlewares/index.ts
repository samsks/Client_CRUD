// AUTHENTICATION
import ensureAuthMiddleware from "./authentication/ensureAuth.middleware";

// AUTHORIZATION
import ensureClientOwnerOrAdmMiddleware from "./authorization/ensureClientOwnerOrAdm.middleware";
import ensureIsAdmMiddleware from "./authorization/ensureIsAdm.middleware";

// FORM HANDLING
import ensureIsValidDataMiddleware from "./formHandling/ensureIsValidData.middleware";

// VALIDATIONS
import ensureClientEmailExistsMiddleware from "./validation/clients/ensureEmailExists.middleware";
import ensureClientIdExistsMiddleware from "./validation/clients/ensureClientIdExists.middleware";
import ensureValidUUIDMiddleware from "./validation/ensureValidUUID.middleware";
import ensureContactPhoneExistsMiddleware from "./validation/clients/ensureContactPhoneExists.middleware";
import ensureContactIdExistsMiddleware from "./validation/clients/ensureContactIdExists.middleware";


// AUTHENTICATION
export { ensureAuthMiddleware }

// AUTHORIZATION
export { ensureClientOwnerOrAdmMiddleware, ensureIsAdmMiddleware }

// FORM HANDLING
export {ensureIsValidDataMiddleware}

// VALIDATIONS
export {ensureClientEmailExistsMiddleware, ensureClientIdExistsMiddleware, ensureValidUUIDMiddleware, ensureContactPhoneExistsMiddleware, ensureContactIdExistsMiddleware}