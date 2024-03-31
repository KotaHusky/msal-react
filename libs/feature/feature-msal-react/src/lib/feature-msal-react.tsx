import { MsalProvider } from '@azure/msal-react';
import { AccountProvider } from '@my-workspace/data-access-account-context';
import { msalInstance } from '@my-workspace/data-access-msal-config';

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
