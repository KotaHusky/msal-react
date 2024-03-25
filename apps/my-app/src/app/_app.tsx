import 'tailwindcss/tailwind.css';
import { AppProps } from 'next/app';
import { MsalReactProvider } from '@myorg/msal-react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <MsalReactProvider>
      <Component {...pageProps} />;
    </MsalReactProvider>
  )
}

export default CustomApp;