import React from 'react';
import styles from './msal-react.module.scss';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './msal-react.config';

/* eslint-disable-next-line */
export interface MsalReactProps {}

export function MsalReact(props: MsalReactProps) {
  // Create an MSAL instance with your configuration
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    // Wrap your component's content with MsalProvider
    <MsalProvider instance={msalInstance}>
      <div className={styles['container']}>
        <h1>Welcome to MsalReact!</h1>
      </div>
    </MsalProvider>
  );
}

export default MsalReact;
