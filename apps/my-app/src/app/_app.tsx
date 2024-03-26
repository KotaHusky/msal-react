import { AppProps } from 'next/app';
import { MsalProviderComponent } from '@myorg/msal-react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MsalProviderComponent>
      <Component {...pageProps} />
    </MsalProviderComponent>
  );
}

export default MyApp;