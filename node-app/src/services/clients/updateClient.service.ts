import AppDataSource from "../../data-source";
import { Client } from "../../entities";
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

  const modifiedUser = clientResSchema.parse(clientAfterUpdate);
  
  return modifiedUser as IClientRes;
};

export default updateClientService