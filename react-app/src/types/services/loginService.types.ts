export interface iLoginReq {
  email: string;
  password: string;
}

export interface iLoginRes {
  token: string;
  refresh: string;
}
