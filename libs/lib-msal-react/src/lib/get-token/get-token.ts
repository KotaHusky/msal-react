import { loginRequest } from "../msal-react";
import { InteractionRequiredAuthError, PublicClientApplication, AccountInfo } from "@azure/msal-browser";

export async function getToken(msalInstance: PublicClientApplication, account: AccountInfo): Promise<string | null> {
  if (!account) {
    throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
  }

  try {
    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: account
    });

    console.log('response:', response)

    if (!response || !response.accessToken) {
      console.error('Failed to acquire token.');
      return null;
    }

    return response.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      // fallback to interaction when silent call fails
      try {
        const response = await msalInstance.acquireTokenPopup({
          ...loginRequest,
          account: account
        });

        if (response === null || response.accessToken === undefined) {
          console.error('Failed to acquire token.');
          return null;
        }

        return response.accessToken;
      } catch (err) {
        console.error('Error acquiring token:', err);
        return null;
      }
    } else {
      console.error('Error acquiring token:', error);
      return null;
    }
  }
}