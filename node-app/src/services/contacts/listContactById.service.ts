import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import Contact from "../../entities/contact.entity";
import { IContactRes } from "../../interfaces/contacts";
import { contactResSchema } from "../../serializers/contacts";

const listContactByIdService = async (contactId: string): Promise<IContactRes> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
  console.log(12, "teste get by id service");

  const findContact = await contactRepository.findOneBy({ id: contactId });

  const contact = contactResSchema.parse(findContact);
  console.log(12, "teste get by id service");
  
  return contact as IContactRes;
};

export default listContactByIdService;
