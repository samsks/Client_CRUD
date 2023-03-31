import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import Contact from "../../entities/contact.entity";
import { IContactRes } from "../../interfaces/contacts";
import { contactListResSchema } from "../../serializers/contacts";

const listAllContactsService = async (userId: string): Promise<IContactRes[] | undefined> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const allContacts = await contactRepository.find({where: {client: {id: userId}}});
  console.log(allContacts)
  const allContactsResponse = contactListResSchema.parse(allContacts);

  return allContactsResponse as Array<IContactRes>;
};

export default listAllContactsService;
