// Import necessary libraries
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useMsal } from "@azure/msal-react";
import { AccountContext } from '@my-workspace/data-access-account-context';
import { PublicClientApplication } from '@azure/msal-browser';
import { getToken } from '@my-workspace/data-access-auth';

/**
 * This component displays a summary of the user's account.
 * It uses the AccountContext to access the user's username.
 */
export const AccountSummary: React.FC = () => {
  // Use the useContext hook to access the AccountContext
  const { username, isLoading } = useContext(AccountContext);
  const { inProgress, instance, accounts } = useMsal();

  // State to hold the API response
  const [apiResponse, setApiResponse] = useState(null);

  // Use the useEffect hook to call the API when the component mounts
  useEffect(() => {
    if (inProgress === 'none' && accounts.length > 0) {
      const fetchTokenAndData = async () => {
        const token = await getToken(instance as PublicClientApplication, accounts[0]); // Replace scopes as needed
        if (token) {
          axios.get('/api/hello-msal', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => setApiResponse(response.data))
          .catch(error => console.error(error));
        }
      };

      fetchTokenAndData();
    }
  }, [inProgress, instance, accounts]);

  // Render the component
  return (
    <div className="text-white">
      {isLoading ? (
        <p>Loading...</p>
      ) : username ? (
        <p>Welcome, {username}!</p>
      ) : (
        <p>Please sign in.</p>
      )}
      {apiResponse && <p>{apiResponse}</p>}
    </div>
  );
};