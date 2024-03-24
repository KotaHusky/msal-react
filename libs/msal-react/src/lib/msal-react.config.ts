import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: 'Your_Application_(Client)_ID',
        authority: 'https://login.microsoftonline.com/Your_Tenant_ID',
        redirectUri: '/'
    }
};
