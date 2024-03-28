import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import styles from './header.module.css';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const { accounts } = useMsal();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (accounts.length > 0) {
      setUsername(accounts[0].username);
    }
  }, [accounts]);

  return (
    <div className={styles['container']}>
      <header className="bg-blue-500 text-white p-4">
        <AuthenticatedTemplate>
          <h1 className="text-xl">Welcome, {username}</h1>
        </AuthenticatedTemplate>
      </header>
    </div>
  );
}

export default Header;