import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import { Client } from "../../entities";
import { clientReqSchema, clientResSchema } from "../../serializers/clients/client.serializer";

type IClientEntity = Repository<Client>

type IClientReq = z.infer<typeof clientReqSchema>;
type IClientRes = z.infer<typeof clientResSchema>;
type IClientUpdate = DeepPartial<IClientReq>;

export {IClientEntity, IClientReq, IClientRes, IClientUpdate}