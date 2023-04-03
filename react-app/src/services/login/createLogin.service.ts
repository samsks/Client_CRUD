import { iLoginReq, iLoginRes } from '@/types/services/loginService.types';
import api from '../index';

export default async function createLogin(
  dataForm: iLoginReq
): Promise<iLoginRes> {
  const { data } = await api.post<iLoginRes>('/login', dataForm);
  return data;
}
