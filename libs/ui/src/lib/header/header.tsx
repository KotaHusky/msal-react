import { AuthenticatedTemplate } from "@azure/msal-react";
import { useContext } from "react";
import styles from './header.module.css';
import { AccountContext } from '@my-workspace/lib-msal-react'

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const { username, isLoading } = useContext(AccountContext);

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