import { useMsal } from "@azure/msal-react";
import { PublicClientApplication } from '@azure/msal-browser';
import { getToken } from '@my-workspace/data-access-auth';

/* eslint-disable-next-line */
export interface ButtonUserDataPostProps {}

export function ButtonUserDataPost(props: ButtonUserDataPostProps) {
  const { inProgress, instance, accounts } = useMsal();

  const handleClick = async () => {
    if (inProgress === 'none' && accounts.length > 0) {
      const token = await getToken(instance as PublicClientApplication, accounts[0]);
      if (token) {
        try {
          const res = await fetch('/api/azure-cosmos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
            }),
          });
          const data = await res.json();
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Welcome to ButtonUserDataPost!</h1>
      <button 
        onClick={handleClick} 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Send POST request
      </button>
    </div>
  );
}

export default ButtonUserDataPost;