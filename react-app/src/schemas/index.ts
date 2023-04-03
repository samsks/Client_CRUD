import * as yup from 'yup';

export const loginClientSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('O campo e-mail é obrigatório')
    .email('Digite um email válido'),
  password: yup.string().required('O campo senha é obrigatório'),
});

export const signupClientSchema = yup.object().shape({
  full_name: yup.string().trim().required('O campo nome é obrigatório'),
  email: yup
    .string()
    .trim()
    .required('O campo e-mail é obrigatório')
    .email('Digite um email válido'),
  password: yup
    .string()
    .required('O campo senha é obrigatório')
    .matches(/[A-Z]/, 'Deve conter ao menos 1 letra maiúscula')
    .matches(/([a-z])/, 'Deve conter ao menos 1 letra minúscula')
    .matches(/(\d)/, 'Deve conter ao menos 1 número')
    .matches(/(\W)|_/, 'Deve conter ao menos 1 carácter especial')
    .matches(/.{8,}/, 'Deve conter ao menos 8 dígitos'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
  phone: yup
    .string()
    .trim()
    .required('O campo telefone é obrigatório')
    .matches(
      /^(\d{2})\s?(\d{4,5})(\d{4})$/,
      'Insira um número de telefone válido'
    ),
});

export const updateClientSchema = yup.object().shape({
  full_name: yup
    .string()
    .trim()
    .length(255, 'Atingiu limite máximo de 255 caracteres'),
  email: yup
    .string()
    .trim()
    .email('Digite um email válido')
    .length(127, 'Atingiu limite máximo de 127 caracteres'),
  password: yup
    .string()
    .matches(/[A-Z]/, 'Deve conter ao menos 1 letra maiúscula')
    .matches(/([a-z])/, 'Deve conter ao menos 1 letra minúscula')
    .matches(/(\d)/, 'Deve conter ao menos 1 número')
    .matches(/(\W)|_/, 'Deve conter ao menos 1 carácter especial')
    .matches(/.{8,}/, 'Deve conter ao menos 8 dígitos')
    .length(30, 'Deve conter no máximo 30 caracteres'),
  phone: yup
    .string()
    .trim()
    .matches(
      /^(\d{2})\s?(\d{4,5})(\d{4})$/,
      'Insira um número de telefone válido'
    ),
});

export const createContactSchema = yup.object().shape({
  full_name: yup
    .string()
    .trim()
    .required('O campo nome é obrigatório')
    .length(255, 'Atingiu limite máximo de 255 caracteres'),
  email: yup
    .string()
    .trim()
    .required('O campo e-mail é obrigatório')
    .email('Digite um email válido')
    .length(127, 'Atingiu limite máximo de 127 caracteres'),
  password: yup
    .string()
    .required('O campo senha é obrigatório')
    .matches(/[A-Z]/, 'Deve conter ao menos 1 letra maiúscula')
    .matches(/([a-z])/, 'Deve conter ao menos 1 letra minúscula')
    .matches(/(\d)/, 'Deve conter ao menos 1 número')
    .matches(/(\W)|_/, 'Deve conter ao menos 1 carácter especial')
    .matches(/.{8,}/, 'Deve conter ao menos 8 dígitos')
    .length(30, 'Deve conter no máximo 30 caracteres'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
  phone: yup
    .string()
    .trim()
    .required('O campo telefone é obrigatório')
    .matches(
      /^(\d{2})\s?(\d{4,5})(\d{4})$/,
      'Insira um número de telefone válido'
    ),
});
