import { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { PublicClientApplication } from '@azure/msal-browser';
import { getToken } from '@my-workspace/data-access-auth';

/* eslint-disable-next-line */
export interface ButtonUserDataGetProps {}

export function ButtonUserDataGet(props: ButtonUserDataGetProps) {
  const { inProgress, instance, accounts } = useMsal();
  const [data, setData] = useState(null);

  const handleClick = async () => {
    if (inProgress === 'none' && accounts.length > 0) {
      const token = await getToken(instance as PublicClientApplication, accounts[0]);
      if (token) {
        try {
          const res = await fetch('/api/azure-cosmos', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await res.json();
          setData(data); // set the state
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Welcome to ButtonUserDataGet!</h1>
      <button 
        onClick={handleClick} 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Get Data
      </button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default ButtonUserDataGet;