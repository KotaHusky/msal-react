'use client'

import { createContext, useEffect, useState } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';

type AccountState = {
  username: string | null;
  isLoading: boolean;
};

const AccountDefaultState: AccountState = {
  username: null,
  isLoading: true,
};

/**
 * Provides a React context for managing authentication using MSAL.
 * This component wraps your application and provides access to the MSAL instance and authentication state.
 * It also handles authentication and token acquisition using MSAL.
 * @see https://react.dev/learn/passing-data-deeply-with-context
 */
const AccountContext = createContext<AccountState>(AccountDefaultState);

const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { inProgress, accounts } = useMsal();
  const [account, setAccount] = useState<AccountState>(AccountDefaultState);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (inProgress === 'none' && accounts.length > 0) {
      setAccount({ username: accounts[0].name ?? null, isLoading: false });
    }
  }, [inProgress, accounts, isAuthenticated]);

  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext, AccountProvider };