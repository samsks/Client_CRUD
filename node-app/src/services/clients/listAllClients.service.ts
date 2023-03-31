import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import Client from "../../entities/client.entity";
import { IClientRes } from "../../interfaces/clients";
import { clientListResSchema } from "../../serializers/clients";

const listAllClientsService = async (): Promise<IClientRes[] | undefined> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

  const allClients = await clientRepository.find();

  const allClientsResponse = clientListResSchema.parse(allClients);

  return allClientsResponse as Array<IClientRes>;
};

export default listAllClientsService;
