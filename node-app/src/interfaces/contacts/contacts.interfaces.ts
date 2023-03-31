import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import Contact from "../../entities/contact.entity";
import { contactReqSchema, contactResSchema } from "../../serializers/contacts";

type IContactEntity = Repository<Contact>

type IContactReq = z.infer<typeof contactReqSchema>;
type IContactRes = z.infer<typeof contactResSchema>;
type IContactUpdate = DeepPartial<IContactReq>;

export { IContactEntity, IContactReq, IContactRes, IContactUpdate }