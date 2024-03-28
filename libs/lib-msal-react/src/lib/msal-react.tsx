'use client';

import { Configuration, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { AccountProvider } from './account-context/account-context';

// MSAL Configuration
const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie:
      typeof window !== 'undefined' &&
      window.navigator.userAgent.indexOf('MSIE') > -1,
  },
};

let msalInstance: PublicClientApplication;

try {
  // Initialize MSAL instance with your configuration
  msalInstance = new PublicClientApplication(msalConfig);
} catch (error) {
  console.error('Failed to initialize MSAL', error);
  // Handle error here, e.g. by showing an error message to the user
}

// Create a component to provide MSAL functionalities
export const MsalProviderComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!msalInstance) {
    return <div>Error initializing MSAL. Please check your configuration.</div>;
  }

  return (
    <div id="msal-provider">
      <MsalProvider instance={msalInstance}>
        <AccountProvider>{children}</AccountProvider>
      </MsalProvider>
    </div>
  );
};
