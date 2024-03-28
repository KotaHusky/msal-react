import { createContext, useContext, useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';

type AccountState = {
  username: string | null;
  isLoading: boolean;
};

/**
 * Provides a React context for managing authentication using MSAL.
 * This component wraps your application and provides access to the MSAL instance and authentication state.
 * It also handles authentication and token acquisition using MSAL.
 * @see https://react.dev/learn/passing-data-deeply-with-context
 */
export const AccountContext = createContext<AccountState>({ username: null, isLoading: true });

// Create a provider component
export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { inProgress, accounts } = useMsal();
  const [account, setAccount] = useState<AccountState>({ username: null, isLoading: true });

  useEffect(() => {
    if (inProgress === 'none' && accounts.length > 0) {
      setAccount({ username: accounts[0].username, isLoading: false });
    }
  }, [inProgress, accounts]);

  return (
    <AccountContext.Provider
      value={account}
    >
      {children}
    </AccountContext.Provider>
  );
};

// Create a hook to use the context
export const useAccount = () => {
  return useContext(AccountContext);
};
