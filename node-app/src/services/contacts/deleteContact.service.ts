import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import Contact from "../../entities/contact.entity";

const deleteContactService = async (contactId: string): Promise<void> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contactData = await contactRepository.findOneBy({
    id: contactId,
  });

  await contactRepository.remove(contactData!);

  return;
};

export default deleteContactService;
