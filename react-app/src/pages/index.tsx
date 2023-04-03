import LoginForm from '@/components/forms/login';
import { Button, Flex, useColorMode } from '@chakra-ui/react';

export default function Home() {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Button pos="absolute" top="4" right="4" onClick={toggleColorMode}>
        Theme
      </Button>
      <Flex
        h={'100vh'}
        w={'100vw'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <LoginForm />
      </Flex>
    </>
  );
}
