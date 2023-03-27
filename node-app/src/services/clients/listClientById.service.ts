import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import { Client } from "../../entities";
import { IClientRes } from "../../interfaces/clients";
import { clientResSchema } from "../../serializers/clients";

const listClientByIdService = async (clientId: string): Promise<IClientRes> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOneBy({ id: clientId });

  const client = clientResSchema.parse(findClient);

  return client as IClientRes;
};

export default listClientByIdService;
