'use client';

import { Configuration, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { AccountProvider } from './account-context/account-context';

const b2cAuthority = 'msalreact';

const policyNames = {
  signUpSignIn: 'B2C_1_signup_signin',
  forgotPassword: 'B2C_1_reset',
  editProfile: 'B2C_1_edit_profile',
};

const b2cPolicies = {
  names: policyNames,
  authorities: {
    signUpSignIn: {
      authority: `https://${b2cAuthority}.b2clogin.com/${b2cAuthority}.onmicrosoft.com/${policyNames.signUpSignIn}`,
    },
    forgotPassword: {
      authority: `https://${b2cAuthority}.b2clogin.com/${b2cAuthority}.onmicrosoft.com/${policyNames.forgotPassword}`,
    },
    editProfile: {
      authority: `https://${b2cAuthority}.b2clogin.com/${b2cAuthority}.onmicrosoft.com/${policyNames.editProfile}`,
    },
  },
  authorityDomain: `${b2cAuthority}.b2clogin.com`,
};

// MSAL Configuration
const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID || '',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie:
      typeof window !== 'undefined' &&
      window.navigator.userAgent.indexOf('MSIE') > -1,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
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
