/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosError } from 'axios';
import createLogin from '@/services/login/createLogin.service';
import {
  iAuthContext,
  iAuthProviderProps,
  iResMessageError,
  iUserData,
} from '@/types/contexts/AuthContext.types';
import { destroyCookie, setCookie } from 'nookies';
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRouter } from 'next/router';
import { Box, useToast } from '@chakra-ui/react';
import { iLoginReq } from '@/types/services/loginService.types';
import { iClientReq } from '@/types/services/userService.types';
import createClient from '@/services/users/createClient.service';

export const AuthContext = createContext<iAuthContext>({} as iAuthContext);

export const AuthProvider = ({ children }: iAuthProviderProps) => {
  // const [globalLoading, setGlobalLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [currentRoute, setCurrentRoute] = useState('');
  const [userData, setUserData] = useState({} as iUserData);
  const [loginError, setLoginError] = useState({});
  const [signupError, setSignupError] = useState({});

  const router = useRouter();
  const toast = useToast();

  const setError = (
    errorResDataMessage: string | object,
    setterStateError: Dispatch<SetStateAction<object>>
  ) => {
    let message = {};
    if (typeof errorResDataMessage === 'string') {
      message = { message: errorResDataMessage };
      setterStateError(message);
    } else if (typeof errorResDataMessage === 'object') {
      Object.entries(errorResDataMessage).forEach(([key, value]) => {
        if (typeof value === 'string') {
          message[key] = value;
          console.log('string', message);
        } else if (Array.isArray(value)) {
          console.log('array', message);
          if (value.length <= 1) {
            message[key] = value[0];
          } else {
            message[key] = '';
            value.forEach((elem) => {
              message[key] = message[key] + `${elem} - `;
            });
            message[key] = message[key].slice(0, -3);
            console.log(message[key]);
          }
          console.log(message);
        }
      });
      setterStateError(message);
    }
  };

  const loginSubmit = async (dataForm: iLoginReq, callback: () => void) => {
    try {
      setLoading(true);
      const data = await createLogin(dataForm);
      const { token, refresh } = data;
      setCookie(null, 'samsks.token', token, {
        maxAge: 30 * 60000,
        path: '/',
      });
      setCookie(null, 'samsks.refresh', refresh, {
        maxAge: 7 * 86400000,
        path: '/',
      });
      if (callback) {
        callback();
      }
      setLoginError({});
      // router.push('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        // const {
        //   response: {
        //     data: { message },
        //   },
        // } = error;
        const { message } = error.response?.data;
        setError(message, setLoginError);

        setUserData({} as iUserData);
      }
    } finally {
      console.log(loginError);

      setLoading(false);
    }
  };

  const logout = () => {
    const myScreen = window.visualViewport?.width as number;
    toast({
      title: 'success',
      variant: 'solid',
      position: myScreen > 1023 ? 'top-right' : 'top',
      isClosable: true,
      render: () => (
        <Box
          color={'gray.100'}
          p={4}
          bg={'green.500'}
          fontWeight={'bold'}
          borderRadius={'md'}
        >
          Até logo {userData.full_name}!
        </Box>
      ),
    });
    destroyCookie(null, 'samsks.token');
    destroyCookie(null, 'samsks.refresh');
    setUserData({} as iUserData);
    void router.push('/');
  };

  const signupSubmit = async (dataForm: iClientReq, callback: () => void) => {
    try {
      setLoading(true);
      await createClient(dataForm);

      const myScreen = window.visualViewport?.width as number;
      toast({
        title: 'success',
        variant: 'solid',
        position: myScreen > 1023 ? 'top-right' : 'top',
        isClosable: true,
        render: () => (
          <Box
            color={'gray.100'}
            p={4}
            bg={'green.500'}
            fontWeight={'bold'}
            borderRadius={'md'}
          >
            Cadastro realizado com sucesso!
          </Box>
        ),
      });

      if (callback) {
        callback();
      }
      setSignupError({});
      setLoginError({});
      void router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        const { message } = error.response?.data;
        setError(message, setSignupError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        // globalLoading,
        // setGlobalLoading,
        loading,
        setLoading,
        logout,
        userData,
        setUserData,
        loginSubmit,
        signupSubmit,
        loginError,
        setLoginError,
        signupError,
        setSignupError,
        // currentRoute,
        // setCurrentRoute,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
