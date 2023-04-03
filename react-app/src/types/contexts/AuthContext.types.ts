import { ReactNode } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { iLoginReq } from '../services/loginService.types';
import { iClientReq } from '../services/userService.types';
import { NextRouter } from 'next/router';

export interface iUserData {
  id?: string;
  full_name?: string;
  email: string;
  phone?: bigint;
  isAdm?: boolean;
  created_at?: string;
}

export interface iAuthProviderProps {
  children: ReactNode;
}

export interface iAuthContext {
  // globalLoading: boolean;
  // setGlobalLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  // currentRoute: string;
  // setCurrentRoute: Dispatch<SetStateAction<string>>;
  userData: iUserData;
  setUserData: Dispatch<SetStateAction<iUserData>>;
  loginError: object;
  setLoginError: Dispatch<SetStateAction<object>>;
  signupError: object;
  setSignupError: Dispatch<SetStateAction<object>>;
  router?: NextRouter;
  loginSubmit: (dataForm: iLoginReq, callback: () => void) => Promise<void>;
  signupSubmit: (dataForm: iClientReq, callback: () => void) => Promise<void>;
  logout: () => void;
}

// export interface iResMessageError {
//   data: {
//     message: string | object;
//   };
// }
