import AppDataSource from "../../data-source";
import Client from "../../entities/client.entity";
import { IClientEntity, IClientRes, IClientUpdate } from "../../interfaces/clients";
import { clientResSchema } from "../../serializers/clients";


const updateClientService = async (
  clientId: string,
  updatedClientData: IClientUpdate
): Promise<IClientRes> => {
  const clientRepository: IClientEntity = AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOneBy({
    id: clientId
  })

  const updatedClient = clientRepository.create({ 
    ...findClient,
    ...updatedClientData 
  });

  const clientAfterUpdate = await clientRepository.save(updatedClient as Client);

  const modifiedClient = clientResSchema.parse(clientAfterUpdate);
  
  return modifiedClient as IClientRes;
};

export default updateClientService