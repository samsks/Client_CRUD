import SignUpForm from '@/components/forms/signup';
import { Flex } from '@chakra-ui/react';

export default function SignUp() {
  return (
    <Flex
      h={'100vh'}
      w={'100vw'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <SignUpForm />
    </Flex>
  );
}
