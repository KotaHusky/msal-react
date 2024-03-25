import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../msal-react';

export function ButtonLogin() {
  const { instance } = useMsal();

  return (
    <div className="inline-flex rounded-md shadow">
      <a
        href="#"
        onClick={() => instance.loginPopup(loginRequest)}
        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Log In
      </a>
    </div>
  );
}

export default ButtonLogin;
