import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
  // useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '@/contexts/AuthContext';
import { iLoginReq } from '@/types/services/loginService.types';
import { loginClientSchema } from '@/schemas';

const LoginForm = () => {
  const { loginSubmit, loginError, loading, userData } =
    useContext(AuthContext);

  const formBackground = useColorModeValue('gray.100', 'gray.700');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginClientSchema),
    mode: 'onSubmit',
  });

  // const memorizedReset = useCallback(reset, [reset]);
  // useEffect(() => {
  //   userData && memorizedReset({ email: userData.email });
  // }, [userData, memorizedReset]);

  const emailError =
    errors.email ||
    Object.keys(loginError).includes('email') ||
    loginError.message?.toLowerCase().includes('email') ||
    loginError.message?.toLowerCase().includes('client');

  const passwordError =
    errors.password ||
    Object.keys(loginError).includes('password') ||
    loginError.message?.toLowerCase().includes('password');

  // const onFormSubmit: SubmitHandler<iLoginReq> = (formData): void => {
  //   void loginSubmit(formData, () => {
  //     reset();
  //   });
  // };

  const onFormSubmit = (formData: iLoginReq) => {
    void loginSubmit(formData, () => {
      reset();
    });
  };

  return (
    <Flex
      as="form"
      direction={'column'}
      background={formBackground}
      p={12}
      rounded={6}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <Heading mb={6}>Login</Heading>
      <FormControl id={'email'} isRequired isInvalid={emailError}>
        <FormLabel>E-mail</FormLabel>
        <Input
          required
          type={'email'}
          placeholder={'mail@mail.com'}
          variant={'filled'}
          // mb={!emailError ? 6 : 0}
          {...register('email')}
        />
        {!emailError ? (
          <FormHelperText mb={6} fontSize={12} pl={1}>
            Digite seu e-mail
          </FormHelperText>
        ) : (
          <FormErrorMessage mb={6} fontSize={12} pl={1}>
            {errors.email?.message ||
              (loginError.message?.toLowerCase().includes('email') &&
                loginError.message) ||
              (loginError.email && loginError.email)}
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl id={'password'} isRequired isInvalid={passwordError}>
        <FormLabel>Senha</FormLabel>
        <Input
          required
          type={'password'}
          placeholder={'********'}
          variant={'filled'}
          // mb={!passwordError ? 6 : 0}
          {...register('password')}
        />
        {!passwordError ? (
          <FormHelperText mb={6} fontSize={12} pl={1}>
            Digite sua senha
          </FormHelperText>
        ) : (
          <FormErrorMessage mb={6} fontSize={12} pl={1}>
            {errors.password?.message ||
              (loginError.message?.toLowerCase().includes('password') &&
                loginError.message) ||
              (loginError.password && loginError.password)}
          </FormErrorMessage>
        )}
      </FormControl>
      <Button
        type="submit"
        loadingText="Entrando..."
        size="lg"
        mb={4}
        colorScheme={'blue'}
      >
        {loading ? <Spinner size="sm" /> : 'Entrar'}
      </Button>
      <Link
        href="/signup"
        fontSize={14}
        textAlign={'center'}
        color="blue.400"
        _hover={{ color: 'blue.500' }}
      >
        Não possui cadastro? Clique aqui
      </Link>
    </Flex>
  );
};

export default LoginForm;
