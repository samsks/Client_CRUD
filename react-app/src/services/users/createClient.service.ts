import { iClientReq, iClientRes } from '@/types/services/userService.types';
import api from '../index';

export default async function createClient(
  dataForm: iClientReq
): Promise<iClientRes> {
  const { data } = await api.post<iClientRes>('/clients', dataForm);
  return data;
}
