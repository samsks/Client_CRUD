import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import { Client } from "../../entities";

const deleteClientService = async (clientId: string): Promise<void> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

  const clientData = await clientRepository.findOneBy({
    id: clientId,
  });

  await clientRepository.remove(clientData!);

  return;
};

export default deleteClientService;
