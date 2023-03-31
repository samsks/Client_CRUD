import AppDataSource from "../../data-source";
import { Repository } from "typeorm";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../../errors";
import Client from "../../entities/client.entity";
import { ISession, ISessionRes } from "../../interfaces/sessions";
import "dotenv/config";


const createSessionService = async ({
  email,
  password,
}: ISession): Promise<ISessionRes> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    email: email,
  });

  if (!client) {
    throw new AppError(403, "Client or password invalid");
  }

  const passwordMatch = await compare(password, client.password);
  if (!passwordMatch) {
    throw new AppError(403, "Client or password invalid");
  }

  const token = jwt.sign(
    {
      isAdm: client.isAdm,
    },
    process.env.TOKEN_SECRET_KEY as string,
    {
      subject: client.id,
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    }
  );
  
  const refresh = jwt.sign(
    {
      isAdm: client.isAdm,
    },
    process.env.REFRESH_SECRET_KEY as string,
    {
      subject: client.id,
      expiresIn: process.env.REFRESH_EXPIRATION_TIME,
    }
  );

  return { token, refresh };
};

export default createSessionService;