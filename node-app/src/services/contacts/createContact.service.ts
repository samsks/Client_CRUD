import AppDataSource from "../../data-source";
import Contact from "../../entities/contact.entity";
import { IContactEntity, IContactReq, IContactRes } from "../../interfaces/contacts";
import { contactResSchema } from "../../serializers/contacts";

const createContactService = async (
  newContactData: IContactReq, clientId: string
): Promise<IContactRes> => {
  const ContactRepository: IContactEntity = AppDataSource.getRepository(Contact);
  console.log(10, "Service");

  // const {clientId, ...contactWithoutClientId} = newContactData
  console.log(14, clientId);
  const createdContact = await ContactRepository
  .createQueryBuilder()
  .insert()
  .into(Contact)
  .values({
    ...newContactData,
    client: { id: clientId}
  })
  .execute();
  console.log(17, createdContact);
  
  const contactAfterInsert = await ContactRepository.findOneBy({
    id: createdContact.identifiers[0].id
  });
  console.log(28, contactAfterInsert);
  
  const newContact = contactResSchema.parse(contactAfterInsert);
  
  return newContact as IContactRes;
};

export default createContactService