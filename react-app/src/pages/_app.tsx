import { AuthProvider } from '@/contexts/AuthContext';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
// import customTheme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
    // theme={customTheme}
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
