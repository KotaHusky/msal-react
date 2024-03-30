import React, { useEffect, useState } from 'react';
import { useAccount } from '@my-workspace/lib-msal-react';
import styles from './account-summary.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AccountSummaryProps {}

export function AccountSummary(props: AccountSummaryProps) {
  const { accessToken } = useAccount();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!accessToken) {
      setError('You must be logged in to view this information.');
      return;
    }

    setLoading(true);
    fetch('/api/hello-msal', { // Adjust the API endpoint as necessary
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch protected data.');
      }
      return response.json();
    })
    .then(data => {
      setData(data);
      setError('');
    })
    .catch(error => {
      console.error("Error fetching protected data:", error);
      setError(error.message);
    })
    .finally(() => setLoading(false));
  }, [accessToken]);

  return (
    <div className={styles.container}>
      <h1>Welcome to AccountSummary!</h1>
      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading account information...</p>
      ) : (
        data && <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

export default AccountSummary;
