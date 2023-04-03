export interface iClientReq {
  full_name: string;
  email: string;
  password: string;
  phone: bigint;
}

export interface iClientRes {
  id: string;
  full_name: string;
  email: string;
  phone: bigint;
  isAdm: boolean;
  created_at: string;
}
