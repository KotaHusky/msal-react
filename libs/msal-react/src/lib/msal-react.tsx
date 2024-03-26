'use client'

import React from 'react';
import { Configuration, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

// Define your MSAL configuration
const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: typeof window !== "undefined" && window.navigator.userAgent.indexOf("MSIE") > -1,
  },
};

// Initialize MSAL instance with your configuration
const msalInstance = new PublicClientApplication(msalConfig);

// Create a component to provide MSAL functionalities
export const MsalProviderComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div id="msal-provider">
      <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
    </div>
  )
};
