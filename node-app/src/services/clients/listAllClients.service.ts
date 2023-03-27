import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import { Client } from "../../entities";
import { IClientRes } from "../../interfaces/clients";
import { clientListResSchema } from "../../serializers/clients";

const listAllClientsService = async (): Promise<IClientRes[] | undefined> => {
  const userRepository: Repository<Client> = AppDataSource.getRepository(Client);

  const allClients = await userRepository.find();

  const allClientsResponse = clientListResSchema.parse(allClients);

  return allClientsResponse as Array<IClientRes>;
};

export default listAllClientsService;
