import AppDataSource from "../../data-source";
import Client from "../../entities/client.entity";
import { hash } from "bcryptjs";
import { IClientEntity, IClientReq, IClientRes } from "../../interfaces/clients";
import { clientResSchema } from "../../serializers/clients";

const createClientService = async (
  newClientData: IClientReq
): Promise<IClientRes> => {
  const clientRepository: IClientEntity = AppDataSource.getRepository(Client);

  const encryptedPassword = await hash(newClientData.password, 10);

  newClientData = { ...newClientData, password: encryptedPassword };

  await clientRepository
  .createQueryBuilder()
  .insert()
  .into(Client)
  .values(newClientData)
  .execute();

  const userAfterInsert = await clientRepository.findOneBy({
    email: newClientData.email,
  });
  
  const newUser = clientResSchema.parse(userAfterInsert);
  
  return newUser as IClientRes;
};

export default createClientService