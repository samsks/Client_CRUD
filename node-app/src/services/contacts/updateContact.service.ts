import AppDataSource from "../../data-source";
import Contact from "../../entities/contact.entity";
import { IContactEntity, IContactRes, IContactUpdate } from "../../interfaces/contacts";
import { contactResSchema } from "../../serializers/contacts";


const updateContactService = async (
  contactId: string,
  updatedContactData: IContactUpdate
): Promise<IContactRes> => {
  const contactRepository: IContactEntity = AppDataSource.getRepository(Contact);

  const findContact = await contactRepository.findOneBy({
    id: contactId
  })

  const updatedContact = contactRepository.create({ 
    ...findContact,
    ...updatedContactData 
  });

  const contactAfterUpdate = await contactRepository.save(updatedContact as Contact);

  const modifiedContact = contactResSchema.parse(contactAfterUpdate);
  
  return modifiedContact as IContactRes;
};

export default updateContactService