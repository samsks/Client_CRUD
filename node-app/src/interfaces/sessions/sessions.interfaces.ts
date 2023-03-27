import { z } from "zod";
import { refreshResSchema, refreshSchema, sessionResSchema, sessionSchema } from "../../serializers/clients/client.serializer";

type ISession = z.infer<typeof sessionSchema>
type ISessionRes = z.infer<typeof sessionResSchema>

type IRefresh = z.infer<typeof refreshSchema>
type IRefreshRes = z.infer<typeof refreshResSchema>

export {ISession, ISessionRes, IRefresh, IRefreshRes}