import jwt from "jsonwebtoken";
import { AppError } from "../../errors";
import Client from "../../entities/client.entity";
import { Repository } from "typeorm";
import { IRefresh, IRefreshRes } from "../../interfaces/sessions";
import AppDataSource from "../../data-source";
import "dotenv/config";

const refreshSessionService = async ({
  refresh,
}: IRefresh): Promise<IRefreshRes> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(
    Client
  );

  const decodedToken = jwt.verify(refresh, process.env.REFRESH_SECRET_KEY as string) as { sub: string };
    
  const client = await clientRepository.findOneBy({
    id: decodedToken.sub
  });

  if (!client) {
    throw new AppError(403, "Invalid refresh token");
  }

  try {
    jwt.verify(refresh, process.env.REFRESH_SECRET_KEY as string, { ignoreExpiration: false });
  } catch (err) {
    throw new AppError(403, "Invalid refresh token");
  }

  const newToken = jwt.sign(
    {
      isAdm: client.isAdm,
    },
    process.env.TOKEN_SECRET_KEY as string,
    {
      subject: client.id,
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    }
  );

  return { token: newToken };
};

export default refreshSessionService;