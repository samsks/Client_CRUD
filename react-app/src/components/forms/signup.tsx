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
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '@/contexts/AuthContext';
import { signupClientSchema } from '@/schemas';
import { iClientReq } from '@/types/services/userService.types';

const SignUpForm = () => {
  const { signupSubmit, signupError, loading } = useContext(AuthContext);

  const formBackground = useColorModeValue('gray.100', 'gray.700');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupClientSchema),
    mode: 'onChange',
  });

  const nameError =
    errors.full_name ||
    Object.keys(signupError).includes('full_name') ||
    signupError.message?.toLowerCase().includes('full_name');

  const emailError =
    errors.email ||
    Object.keys(signupError).includes('email') ||
    signupError.message?.toLowerCase().includes('email') ||
    signupError.message?.toLowerCase().includes('client');

  const passwordError =
    errors.password ||
    Object.keys(signupError).includes('password') ||
    signupError.message?.toLowerCase().includes('password');

  const passwordConfirmError =
    errors.passwordConfirm ||
    Object.keys(signupError).includes('passwordConfirm') ||
    signupError.message?.toLowerCase().includes('passwordConfirm');

  const phoneError =
    errors.phone ||
    Object.keys(signupError).includes('phone') ||
    signupError.message?.toLowerCase().includes('phone');

  // const onFormSubmit: SubmitHandler<iLoginReq> = (formData): void => {
  //   void loginSubmit(formData, () => {
  //     reset();
  //   });
  // };
  const onFormSubmit = (formData: iClientReq) => {
    signupSubmit(formData, () => {
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
      <Heading mb={6}>Registre-se</Heading>
      <FormControl id={'full_name'} isRequired isInvalid={nameError}>
        <FormLabel>Nome</FormLabel>
        <Input
          required
          type={'full_name'}
          placeholder={'John Sullivan'}
          variant={'filled'}
          {...register('full_name')}
        />
        {!nameError ? (
          <FormHelperText mb={6} fontSize={12} pl={1}>
            Digite seu nome
          </FormHelperText>
        ) : (
          <FormErrorMessage mb={6} fontSize={12} pl={1}>
            {errors.full_name?.message ||
              (signupError.message?.toLowerCase().includes('full_name') &&
                signupError.message) ||
              (signupError.full_name && signupError.full_name)}
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl id={'email'} isRequired isInvalid={emailError}>
        <FormLabel>E-mail</FormLabel>
        <Input
          required
          type={'email'}
          placeholder={'mail@mail.com'}
          variant={'filled'}
          {...register('email')}
        />
        {!emailError ? (
          <FormHelperText mb={6} fontSize={12} pl={1}>
            Digite seu e-mail
          </FormHelperText>
        ) : (
          <FormErrorMessage mb={6} fontSize={12} pl={1}>
            {errors.email?.message ||
              (signupError.message?.toLowerCase().includes('email') &&
                signupError.message) ||
              (signupError.email && signupError.email)}
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
          {...register('password')}
        />
        {!passwordError ? (
          <FormHelperText mb={6} fontSize={12} pl={1}>
            Digite sua senha
          </FormHelperText>
        ) : (
          <FormErrorMessage mb={6} fontSize={12} pl={1}>
            {errors.password?.message ||
              (signupError.message?.toLowerCase().includes('password') &&
                signupError.message) ||
              (signupError.password && signupError.password)}
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl
        id={'passwordConfirm'}
        isRequired
        isInvalid={passwordConfirmError}
      >
        <FormLabel>Confirme a senha</FormLabel>
        <Input
          required
          type={'password'}
          placeholder={'********'}
          variant={'filled'}
          {...register('passwordConfirm')}
        />
        {!passwordConfirmError ? (
          <FormHelperText mb={6} fontSize={12} pl={1}>
            Repita a senha
          </FormHelperText>
        ) : (
          <FormErrorMessage mb={6} fontSize={12} pl={1}>
            {errors.passwordConfirm?.message ||
              (signupError.message?.toLowerCase().includes('passwordConfirm') &&
                signupError.message) ||
              (signupError.passwordConfirm && signupError.passwordConfirm)}
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl id={'phone'} isRequired isInvalid={phoneError}>
        <FormLabel>Telefone</FormLabel>
        <Input
          required
          type={'tel'}
          placeholder={'1191234567'}
          variant={'filled'}
          {...register('phone')}
        />
        {!phoneError ? (
          <FormHelperText mb={6} fontSize={12} pl={1}>
            Digite seu telefone
          </FormHelperText>
        ) : (
          <FormErrorMessage mb={6} fontSize={12} pl={1}>
            {errors.phone?.message ||
              (signupError.message?.toLowerCase().includes('phone') &&
                signupError.message) ||
              (signupError.phone && signupError.phone)}
          </FormErrorMessage>
        )}
      </FormControl>
      <Button
        type="submit"
        loadingText="Cadastrando..."
        size="lg"
        mb={6}
        colorScheme={'blue'}
      >
        {loading ? <Spinner size="sm" /> : 'Cadastrar'}
      </Button>
      <Link
        href="/"
        fontSize={14}
        textAlign={'center'}
        color="blue.400"
        _hover={{ color: 'blue.500' }}
      >
        Acessar sua conta? Clique aqui
      </Link>
    </Flex>
  );
};

export default SignUpForm;
