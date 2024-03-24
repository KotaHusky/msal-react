// pages/index.tsx in your Next.js app
import React from 'react';
import styles from './page.module.scss';
import { ButtonLogin } from '@org/msal-react';
import { useIsAuthenticated } from '@azure/msal-react';

export default function Index() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Protected Content</h2>
          <p>This content is only visible to authenticated users.</p>
          {/* More protected content here */}
        </div>
      ) : (
        <div>
          <h2>Welcome</h2>
          <p>Please sign in to view the protected content.</p>
          <ButtonLogin />
        </div>
      )}
    </div>
  );
}
